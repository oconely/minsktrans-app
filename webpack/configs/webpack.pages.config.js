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
        index: [
            path.resolve('./src/js/app.js'),
            path.resolve('./src/postcss/core.css'), 
            ...glob.sync('./src/components/pages/index/**/*.css'), // get all paths to styles for components
            ...glob.sync('./src/components/public/**/*.css')
        ],
    },
    output: {
        path: path.resolve('./'),
        filename: '[name].js',
        publicPath:'./',
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve('./src/pages/proj/index.pug'),
            title: 'Minsktrans React App | Shows stops for regular bus routes. Enjoy 🚌',
            // excludeChunks: ['post']
        }),
        mode === "production" && new CreateSvgSprite({
            injectTo: ['index.html'],
            onInject: p => {
                fs.readFile(path.resolve('./images/svg/sprite/sprite.svg'), 'utf8', (err, svg) => {
                    // clean up redundant data from svg
                    if (svg.indexOf("<svg") > 0) {
                        const start = svg.indexOf('<svg');
                        svg = svg.slice(start);
                    }
                    fs.readFile(path.resolve(`./${p}`), 'utf8', (err, html) => {
                        if (err) throw err;
                        const len = '<body>'.length;
                        const htmlWithSVG = html.slice(0, html.indexOf('<body>') + len) + svg + html.slice(html.indexOf('<body>') + len);
                        const htmlWithoutUrlToSVG = htmlWithSVG.replace(/\.\/images\/svg\/.*?\.svg/g, '');
                        fs.writeFile(path.resolve(`./${p}`), htmlWithoutUrlToSVG, (err) => {
                            if (err) throw err;
                        });
                    });
                });
            },
            svgSpriteConfig: {
                mode: {
                    symbol: {
                        sprite: `../sprite.svg`
                    }
                }
            }
        }),
    ].filter(Boolean)
});
}