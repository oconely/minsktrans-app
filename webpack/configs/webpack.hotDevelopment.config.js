const merge = require('webpack-merge');
const { devServer } = require('../webpack.server.config.js');
const { loadStyles, hotModuleReplacement, extractStyles, cleanBuildDir} = require('../webpack.parts.config.js');
const { dir } = require('../../utils/utils-func.js');
exports.hotDevelopmentConfig = merge([
    //extractStyles(),
    loadStyles(),
    hotModuleReplacement(),
    devServer({
        headers: { "Access-Control-Allow-Origin": "*" },
        port: 8004,
        watchOptions: {
            aggregateTimeout: 300,  
            poll: 1000
        },
        hot: true,
        writeToDisk: true
    }),
    cleanBuildDir(['build'], {
        root: dir('./')
    }),
])