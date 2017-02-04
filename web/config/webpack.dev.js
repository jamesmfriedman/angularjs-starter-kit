module.exports = {
	output: {
		sourceMapFilename: '[name].map.js',
	},
	devtool: '#source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: './public',
		headers: { 
			'Access-Control-Allow-Origin': '*'
		},
		hot: true,
		noInfo: true,
		stats: {
			colors: true
		}
	}
};