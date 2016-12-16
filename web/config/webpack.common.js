const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function HelloWorldPlugin() {}
HelloWorldPlugin.prototype.apply = function(compiler) {
	compiler.plugin('compilation', function() {
		console.log('Compiling...');
	});
	compiler.plugin('done', function() {
		console.log('Compiled', new Date().toLocaleTimeString());
	});
};

module.exports = {
	context: __dirname,
	entry: {
		app: ['../src/main'],
		styles: ['../src/styles.scss'],
		vendors: ['../src/vendors'],
		polyfills: ['../src/polyfills']
	},
	output: {
		path: './public/',
		filename: 'dist/[name].js',
		publicPath: '/'
    },
    resolve: {
		modulesDirectories: ['../src', 'web_modules', 'node_modules']
	},
	module: {
		loaders: [
			{
		        test: /\.scss$/,
		        loaders: ['style', 'css?sourceMap', 'postcss?config=./config/postcss.config.js', 'sass?sourceMap', 'import-glob']
		    },
		    {
		        test: /\.html$/,
		        exclude: /index\.html/,
		        loaders: ['ng-cache']
		    }
		]
	},
	plugins: [
		new HelloWorldPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
	 	
	 	new CommonsChunkPlugin({
	 		name: 'commons',
	 		filename: 'commons.js',
        	chunks: ['polyfills', 'vendors', 'styles', 'app']
      	}),

      	new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../src/index.html',
            chunks: ['commons', 'polyfills', 'vendors', 'styles', 'app'],
            hash: process.env.NODE_ENV === 'DEV' ? false : true
        })
	]
};

