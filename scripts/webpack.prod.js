const {merge} = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")
const {ROOT_PATH} = require("./consts")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
    target: "browserslist",
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(ROOT_PATH, "./dist"),
        filename: "js/[name].[contenthash:8].js",
        assetModuleFilename: 'images/[name].[contenthash:8].[ext]'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {pure_funcs: ['console.log']}
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        })
    ]
})


