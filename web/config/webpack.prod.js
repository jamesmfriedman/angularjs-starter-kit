const config = require('./webpack.common');
const webpack = require('webpack');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

config.plugins = config.plugins.concat([
	new ngAnnotatePlugin({
        add: true
    }),
	new webpack.optimize.UglifyJsPlugin()
]);

module.exports = config;