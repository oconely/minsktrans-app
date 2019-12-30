const merge = require('webpack-merge');
const { dir } = require('../../utils/utils-func.js');
const makeBundleSplitting = require('../webpack.optimization.js');

const { 
    generateSourceMaps,
    loadSVG,
    loadJS, 
    extractStyles, 
    loadFonts,
    loadVideos,
    cleanBuildDir, 
    loadPug, 
    loadImages,
    urlLoader,
    providePlugin,
    copyToBuild,
    loadPostCSS,
    responsiveImages,
    convertImgToWebP,
    createSVGSprite,
    // makeBundleSplitting,
 } = require('../webpack.parts.config.js');

exports.commonConfig = (mode, ouputPath) => merge([
    (() => mode === "development" && 
            generateSourceMaps({type: 'cheap-inline-module-source-map'}))
    (), 
    // makeBundleSplitting,
    extractStyles(),
    loadPostCSS({
        // cssLoaderOptions: {
        //     url: false
        // }
    }),
    // urlLoader(),
    loadJS({
        exclude: /mode_modules/,
    }), 
    loadImages({
        options: {
            name: mode === 'production' ? 'images/[name].[ext]' : 'images/[name].[ext]'
        }
    }),
    loadSVG({
        options: {
            name: 'images/svg/[name].[ext]',
        }
    }),
    loadFonts({
        options: {
            name: mode === 'production' ? 'fonts/[name].[ext]' : 'fonts/[name].[ext]'
        }
    }),
    // copyToBuild([
    //     // {from: dir('./src/js/sw.js'), to: dir('./build/index/')},
    //     // {from: dir('./src/pwa/manifest.webmanifest'), to: dir('./build/index/')},
    //     {from: dir('./src/videos/'), to: `./videos/`}
    // ]),
    cleanBuildDir(['build'], {
        root: dir('./')
    }),
    loadPug({
        options: {
            pretty: process.argv.includes("production") ? false : "\t"
        }
    }),
].filter(Boolean));