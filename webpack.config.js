// Some setup
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var procName = process.argv[1].split('/').pop();
var host = 'localhost';
var port = '8080';

if (process.argv.indexOf('--host') != -1) {
	host = process.argv[process.argv.indexOf('--host') + 1];
}

if (process.argv.indexOf('--port') != -1) {
	port = process.argv[process.argv.indexOf('--port') + 1];
}

var hostPort = host + ':' + port;

// Our main config
var config = {
	context: __dirname,
	entry: {
		app: ['./src/main', './src/main.scss']
	},
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
		        loaders: ['style/url','file?name=/app.css?[hash]', 'autoprefixer', 'sass', 'import-glob']
		    }
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	]
};

// Dev Config Aadditions
if (procName == 'webpack-dev-server') {
	config.devtool = '#source-map';
	config.output.sourceMapFilename = '[name].map.js';
	
	config.entry.app.unshift('webpack-dev-server/client?http://' + hostPort);
	config.entry.app.unshift('webpack/hot/dev-server');
	
	//conf
	config.devServer = {
		contentBase: __dirname + '/public',
		headers: { 
			//To add headers to the dev server "Access-Control-Allow-Origin": '*', 
		},
		hot: true,
		noInfo: true,
		stats: {
			colors: true
		}

		//OPTIONAL PROXY SERVER https://webpack.github.io/docs/webpack-dev-server.html#proxy
	   	// proxy: {
     //        '*': {
     //            target: 'http://example.com',
     //            secure: false,
     //        },
     //    },
	};

	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

	
}

if (procName == 'webpack') {
	config.plugins = config.plugins.concat([
		new ngAnnotatePlugin({
            add: true
        }),
		new webpack.optimize.UglifyJsPlugin()
	]);
}


module.exports = config;