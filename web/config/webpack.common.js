const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

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
	context: path.join(__dirname, '../'),
	entry: {
		app: ['./src/main'],
		styles: ['./src/styles.scss'],
		vendors: ['./src/vendors'],
		polyfills: ['./src/polyfills']
	},
	output: {
		path: path.join(__dirname, '../public/'),
		filename: 'dist/[name].js',
		publicPath: '/'
    },
    resolve: {
		modules: ['./src', 'web_modules', 'node_modules']
	},
	module: {
		loaders: [
			{
		        test: /\.scss$/,
		        loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?config=./config/postcss.config.js', 'sass-loader?sourceMap', 'import-glob-loader']
		    },
		    {
		        test: /\.html$/,
		        exclude: /index\.html/,
		        loaders: ['ng-cache-loader']
		    }
		]
	},
	plugins: [
		new HelloWorldPlugin(),

		new webpack.DefinePlugin({
			'process.env': JSON.stringify(require('./env.' + process.env.NODE_ENV))
		}),
	 	
	 	new CommonsChunkPlugin({
	 		name: 'commons',
	 		filename: 'commons.js',
        	chunks: ['polyfills', 'vendors', 'styles', 'app']
      	}),

      	new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['commons', 'styles', 'polyfills', 'vendors', 'app'],
			chunksSortMode: (a, b) => {
				let chunksOrder = ['commons', 'styles', 'polyfills', 'vendors', 'app'];
				return chunksOrder.indexOf(a.names[0]) > chunksOrder.indexOf(b.names[0]);
			},
            hash: process.env.NODE_ENV === 'DEV' ? false : true
        })
	]
};

