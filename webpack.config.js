var APP_NAME = 'app';

var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function WebpackConfig() {
	this.config = {};

	this.host = 'localhost';
	this.port = '8080';
	this.hostPort = undefined;
	this.procName = process.argv[1].split('/').pop();
	
	this.constructor = function() {
		if (process.argv.indexOf('--host') != -1) {
			this.host = process.argv[process.argv.indexOf('--host') + 1];
		}

		if (process.argv.indexOf('--port') != -1) {
			this.port = process.argv[process.argv.indexOf('--port') + 1];
		}

		this.hostPort = this.host + ':' + this.port;

		this.generalConfig();
		if (this.procName == 'webpack-dev-server') {
			this.devConfig();
		}

		if (this.procName == 'webpack') {
			this.buildConfig();
		}
	}
	
	/**
	 * Generic config object, gets applied to everything
	 */
	this.generalConfig = function() {
		this.config = {
			context: __dirname,
			entry: {}, // set below
			output: {
				path: './public/dist',
				filename: '[name].js', // no hash in main.js because index.html is a static page
				publicPath: '/dist'
		    },
		    resolve: {
				modulesDirectories: ['src', 'web_modules', 'node_modules']
			},
			module: {
				loaders: [
					{
				        test: /\.scss$/,
				        loaders: ['style/url','file?name=/'+ APP_NAME +'.css?[hash]', 'autoprefixer', 'sass', 'import-glob']
				    }
				]
			},
			plugins: [
				new ExtractTextPlugin('[name].css'),
				new HelloWorldPlugin()
			]
		}

		this.config.entry[APP_NAME] = ['./src/main', './src/main.scss'];
	}

	/**
	 * Additions for webpack-dev-server only
	 */
	this.devConfig = function() {
		// watch html files
		this.config.entry[APP_NAME].unshift('./src/templates');
		this.config.module.loaders.push({
		   test: /\.html$/,
		   loader: 'raw-loader'
		});

		// source maps
		this.config.devtool = '#source-map';
		this.config.output.sourceMapFilename = '[name].map.js';
		
		// hot mode
		this.config.entry[APP_NAME].unshift('webpack-dev-server/client?http://' + this.hostPort);
		this.config.entry[APP_NAME].unshift('webpack/hot/dev-server');
		this.config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
		
		// dev server conf
		this.config.devServer = {
			historyApiFallback: true,
			contentBase: __dirname + '/public',
			headers: { 
				"Access-Control-Allow-Origin": '*', 
			},
			hot: true,
			noInfo: true,
			stats: {
				colors: true
			}

			// OPTIONAL PROXY SERVER https://webpack.github.io/docs/webpack-dev-server.html#proxy
			// proxy: {
			//     '*': {
			//         target: 'http://example.com',
			//         secure: false,
			//     },
			// },
		};
	}

	/**
	 * Additions for webpack only
	 */
	this.buildConfig = function() {
		this.config.plugins = this.config.plugins.concat([
			new ngAnnotatePlugin({
	            add: true
	        }),
			new webpack.optimize.UglifyJsPlugin()
		]);
	}

	this.constructor();
}

function HelloWorldPlugin(options) {
  // Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
	
	compiler.plugin('compilation', function() {
		console.log('Compiled', new Date().toLocaleTimeString());
	});
};

module.exports = new WebpackConfig().config;