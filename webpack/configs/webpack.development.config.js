const merge = require('webpack-merge');
const { devServer } = require('../webpack.server.config.js');
const { loadPostCSS, extractStyles, cleanBuildDir, loadStyles } = require('../webpack.parts.config');
const { dir } = require('../../utils/utils-func.js');

exports.developmentConfig = merge([
    // extractStyles(),
    // loadPostCSS(),
    // loadStyles(),
    devServer({
        headers: { "Access-Control-Allow-Origin": "*" },
        port: 8004,
        watchOptions: {
            aggregateTimeout: 300,  
            poll: 1000
        },
        writeToDisk: true,
        // hot: true,
    }),
    // cleanBuildDir(['build'], {
    //     root: dir('./')
    // }),
]);