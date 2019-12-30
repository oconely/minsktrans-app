const webpack = require('webpack');

exports.devServer = (config) => ({
    devServer: {

        publicPath: 'build/media/',
        historyApiFallback: {
            index: 'build/media/'
        },
        stats: {
        },
        headers: { "Access-Control-Allow-Origin": "*" },
        overlay: true,
        //hot: true,
        ...config,
    }
})