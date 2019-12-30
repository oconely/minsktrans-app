exports.codeSplitting = () => ({
    optimization: {
        splitChunks: {
            maxInitialRequests: 20,
            maxAsyncRequests: 20,
            // create separate chunks based on some condition
            cacheGroups: {

                default: false,
                vendors: false,
                vendor: {
                    name: 'vendors',
                    chunks: 'initial',
                    // import file path containing node_modules
                    test: /node_modules/,
                    priority: 20
                },
                // common: {
                //     name: 'common',
                //     // minChunks: 4,
                //     chunks: 'initial',
                //     reuseExistingChunk: true,
                //     enforce: true,
                //     priority: 10
                // }
            },
        },
        runtimeChunk: "single"
    }
});