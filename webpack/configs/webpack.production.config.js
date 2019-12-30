const merge = require('webpack-merge');
const { minifyStyles, optimizeImages, loadPostCSS, extractStyles } = require('../webpack.parts.config.js');

exports.productionConfig = merge([
    // extractStyles(),
    // loadPostCSS(),
    minifyStyles(),
    // optimizeImages()
]);