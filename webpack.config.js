const merge = require('webpack-merge');
const { commonConfig } = require('./webpack/configs/webpack.common.config');
const { productionConfig } = require('./webpack/configs/webpack.production.config');
const { developmentConfig } = require('./webpack/configs/webpack.development.config');
const { hotDevelopmentConfig } = require('./webpack/configs/webpack.hotDevelopment.config');
const { pages } = require('./webpack/configs/webpack.pages.config');
const { codeSplitting } = require('./webpack/webpack.optimization');

module.exports = (mode, argv) => {
    switch(mode) {
        case("production"):
            config = productionConfig;
            break;
        case("development"):
            config = developmentConfig;
            break;
        default:
            config = hotDevelopmentConfig;
    }
    return merge([
            config, 
            pages(mode), 
            commonConfig(mode), 
            codeSplitting(),
            { mode }, 
        ]);
}
