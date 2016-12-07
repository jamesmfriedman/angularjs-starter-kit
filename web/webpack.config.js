let config;

switch (process.env.NODE_ENV) {
	case 'DEV':
		config = require('./config/webpack.dev');
		break;
	case 'PROD':
	case 'TEST':
		config = require('./config/webpack.prod');
		break;
}

module.exports = config;