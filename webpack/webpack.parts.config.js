const path = require('path');
const {dir} = require('../utils/utils-func');
const CSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

const CopyAssetsToAnotherDir = require('./plugins/CopyAssestsToAnotherDir');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// const CreateSvgSprite = require('./plugins/CreateSvgSprite');
// const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


// PLUGINS
exports.extractStyles = (config) => ({
    plugins: [
        new CSSExtractPlugin({
            filename: process.argv.includes("production") ? '[name].css' : '[name].css',
            chunkFilename: process.argv.includes("production") ? '[name].css' : '[name].css',
            ...config
        }),
    ]
});

exports.generatePage = ({
        excludeAssets, 
        sync, 
        defaultAttribute = "defer", 
        path = "", 
        entry, 
        mode,
        output,
        createSVG: {
            pageName,
            ...restSvgConfig
        },
        criticalCSS: {
            useCritical,
            ignoreSelectors = [],
            criticalHeight = 952,
            criticalWidth = 1920
        },
        name,
        excludeChunks,
        fileWhitelistForPreload,
        fileWhitelistForPrefetch,
        
        ...config} = {}
    ) => ({
        entry,
        output: (() => ({
            path: dir(`./build/${name}`),
            filename: mode === "production" ? '[name].[hash:4].js' : '[name].js',
            chunkFilename: mode === "production" ? '[name].[chunkhash:4].js' : '[name].js',
            ...output
        }))(),
        plugins: [
            new HTMLWebpackPlugin({
                filename: `${name}.html`,
                excludeAssets,
                excludeChunks,
                ...config
            }),
            new PreloadWebpackPlugin({
                include: 'allAssets',
                fileWhitelist: fileWhitelistForPreload || [],
                as(entry) {
                    if (/\.css$/.test(entry)) return 'style';
                    if (/\.(ttf|woff|woff2)$/.test(entry)) return 'font';
                    if (/\.(png|jp?eg|webp|gif)$/.test(entry)) return 'image';
                    return 'script';
                }
            }),
            new PreloadWebpackPlugin({
                rel: 'prefetch',
                include: 'allAssets',
                fileWhitelist: fileWhitelistForPrefetch || [],
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute
            }),
            new CreateSvgSprite({
                mode,
                pageName,
                svgSpriteConfig: {
                    mode: {
                        symbol: {
                            sprite: `../sprite-${name}.svg`
                        }
                    }
                },
                ...restSvgConfig
            }),
            (() => 
                mode === 'production' && useCritical
                && new HtmlCriticalWebpackPlugin({
                    base: `./build/${name}`,
                    src: `${name}.html`,
                    dest: `${name}.html`,
                    inline: true,
                    minify: true,
                    extract: true,
                    width: criticalWidth,
                    height: criticalHeight,
                    penthouse: {
                        blockJSRequests: false,
                    },
                    ignore: ignoreSelectors 
                }
            ))() 
        ].filter(plugin => plugin)
    });

exports.hotModuleReplacement = () => ({
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})

exports.enableFilesCompression = () => ({
    plugins: [
        new CompressionPlugin()
    ]
})

exports.minifyStyles = (config) => ({
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            ...config
        })
    ]
});

exports.cleanBuildDir = (path, options) => ({
    plugins: [
        new CleanWebpackPlugin([...path], options)
    ]
});

exports.providePlugin = () => ({
    plugins: [
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        })
    ]  
})

exports.copyToBuild = (paths) => ({
    plugins: [
        new CopyWebpackPlugin(paths)
    ]
})

// LOADERS
exports.loadPostCSS = ({cssLoaderOptions} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    CSSExtractPlugin.loader, 
                    //'style-loader',
                    {
                        loader: 'css-loader', options: cssLoaderOptions
                    },
                    'postcss-loader',
                ]
            }
        ]
    }
});

exports.loadStyles = ({cssLoaderOptions} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', cssLoaderOptions}, 
                    'postcss-loader'
                ]
            }
        ]
    }
})

exports.loadJS = ( {include, exclude, options} = {} ) => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include,
                exclude,
                use: {
                    loader: 'babel-loader',
                    options,
                    query: {compact: false}
                }
            }
        ]
    }
});

exports.loadPug = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(pug|jade)$/,
                include,
                exclude,
                use: {
                    loader: 'pug-loader',
                    options
                }
            }
        ]
    }
});

// For debug purposes
exports.generateSourceMaps = ({type}) => ({
    devtool: type
})


exports.loadSVG = ( {include, exclude, options} = {} ) => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                include,
                exclude,
                use: {
                    loader: 'file-loader',
                    options
                }
            }
        ]
    }
});



exports.loadFonts = ( {include, exclude, options} = {} ) => ({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2|otf)$/,
                include,
                exclude,
                use: {
                    loader: 'file-loader',
                    options
                }
            }
        ]
    }
});

exports.loadImages = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|ico|webp|gif)$/,
                include,
                exclude,
                use: {
                    loader: "file-loader",
                    options,
                }
            }
        ]
    }
});

exports.loadVideos = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.mp4$/,
                include,
                exclude,
                use: {
                    loader: "file-loader",
                    options,
                }
            }
        ]
    }
});

exports.urlLoader = ({include, exclude, options} = {}) => ({
    module: {
      rules: [
        {
          test: /\grab\.png$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 3192,
              },
            },
          ],
        },
      ],
    },
  });

exports.optimizeImages = ({} ={}) => ({
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'image-webpack-loader',
                // Specify enforce: 'pre' to apply the loader
                // before url-loader/svg-url-loader
                // and not duplicate it in rules with them
                enforce: 'pre',
                options:{
                    svgo:{
                        plugins: [
                            {
                                cleanupIDs: false
                            }
                        ]
                    }
                }
            }
        ]
    }
})

exports.responsiveImages = ({options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/i,
                loader: 'responsive-loader',  
                options
            }
        ]
    }
})

exports.convertImgToWebP = () => ({
    plugins: [
        new ImageminWebpWebpackPlugin()
    ]
});

exports.createSVGSprite = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                //exclude: path.resolve(__dirname, 'node_modules/photoswipe/dist/default-skin/default-skin.svg'),
                use: [
                    'svg-sprite-loader',
                    // 'svgo-loader'
                ]
            },
        ]
    },
    plugins: [
        new SpriteLoaderPlugin(),
    ]
})
