const config = require('./webpack.common');
const webpack = require('webpack');

let host = 'localhost';
let port = '8080';
let hostPort;

if (process.argv.indexOf('--host') !== -1) {
	host = process.argv[process.argv.indexOf('--host') + 1];
}

if (process.argv.indexOf('--port') !== -1) {
	port = process.argv[process.argv.indexOf('--port') + 1];
}

hostPort = host + ':' + port;

// watch html files
config.entry.app.unshift('../src/templates');
config.module.loaders.push({
   test: /\.html$/,
   loader: 'raw-loader'
});

// source maps
config.devtool = '#source-map';
config.output.sourceMapFilename = '[name].map.js';

// hot mode
config.entry.app.unshift('webpack-dev-server/client?http://' + hostPort);
config.entry.app.unshift('webpack/hot/dev-server');
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

// dev server conf
config.devServer = {
	historyApiFallback: {
		index: '/dist/'
	},
	contentBase: './public',
	headers: { 
		'Access-Control-Allow-Origin': '*'
	},
	hot: true,
	noInfo: true,
	stats: {
		colors: true
	}
};

module.exports = config;