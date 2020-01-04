const webpack = require('webpack');

exports.devServer = (config) => ({
    devServer: {
        host: "192.168.32.44",
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