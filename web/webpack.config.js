/**
 * Specify the following env variables
 * BUILD_ENV: the name of the config to merge on top of common.
 * 		Specifying 'prod' will look for a file in ./config called webpack.prod.js
 * NODE_ENV: Sets environment variables available at runtime in the JS under process.env.
 * 		Specifying 'dev' will look for a file in ./config called env.dev.js
 */

const merge = require('webpack-merge');
let config = require('./config/webpack.common');
let buildEnvConf = require('./config/webpack.' + process.env.BUILD_ENV);
module.exports = merge(config, buildEnvConf);