const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { dir } = require('../../utils/utils-func');
const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyAssetsToAnotherDir = require('../plugins/CopyAssestsToAnotherDir');
const CreateSvgSprite = require('../plugins/CreateSvgSprite');

exports.pages = (mode) => {
    return ({
    entry: { 
        app: [
            path.resolve('./src/js/app.js'),
            path.resolve('./src/postcss/core.css'), 
            ...glob.sync('./src/components/pages/index/**/*.css'), // get all paths to styles for components
        ],
    },
    output: {
        path: path.resolve('./'),
        filename: '[name].js',
        publicPath:'./',
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'minskTransApp.html',
            template: path.resolve('./src/pages/proj/index.pug'),
            title: 'Minsktrans React App | Shows stops for regular bus routes. Enjoy 🚌',
        })
    ]
});
}