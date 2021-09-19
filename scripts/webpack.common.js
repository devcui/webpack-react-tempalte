const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackBar = require("webpackbar")
const {ROOT_PATH} = require('./consts')
const {isDevelopment, isProduction} = require("./env");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const getCssLoaders = () => {
    const cssLoaders = [];
    cssLoaders.push(isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: "[local]--[hash:base64:5]"
                },
                sourceMap: isDevelopment
            }
        }
    )
    isProduction && cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    isProduction && [
                        'postcss-preset-env',
                        {
                            autoprefixer: {grid: true}
                        }
                    ]
                ]
            }
        }
    })
    return cssLoaders;
}

module.exports = {
    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename]
        }
    },
    resolve: {
        alias: {
            "src": path.resolve(ROOT_PATH, './src'),
            "components": path.resolve(ROOT_PATH, './src/components'),
            "utils": path.resolve(ROOT_PATH, './src/utils')
        },
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    entry: {
        app: path.resolve(ROOT_PATH, './src/index.tsx')
    },
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0
        }
    },
    module: {
        rules: [
            {test: /\.css$/, use: [...getCssLoaders()]},
            {test: /\.less$/, use: [...getCssLoaders(), {loader: 'less-loader', options: {sourceMap: isDevelopment}}]},
            {test: /\.scss$/, use: [...getCssLoaders(), {loader: 'sass-loader', options: {sourceMap: isDevelopment}}]},
            {test: /\.(tsx?|js)$/, loader: "babel-loader", options: {cacheDirectory: true}, exclude: /node_modules/},
            {
                test: [/\.bmp$/, /.gif\$/, /\.jpe?g$/, /\.png$/],
                type: "asset",
                parser: {
                    dataUrlCondition: {maxSize: 4 * 1024}
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(ROOT_PATH, "./tsconfig.json")
            }
        }),
        new WebpackBar({name: "loading...", color: '#52c41a'}),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, './public/index.html')
        }),
        new CopyPlugin({
            patterns: [{
                context: path.resolve(ROOT_PATH, './public'),
                from: "*",
                to: path.resolve(ROOT_PATH, './dist/public'),
                toType: 'dir',
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: ['**/index.html']
                }
            }]
        }),
    ]
}