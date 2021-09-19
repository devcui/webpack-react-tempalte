const {merge} = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")
const {ROOT_PATH} = require("./consts")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(ROOT_PATH, "./dist"),
        filename: "js/[name].[contenthash:8].js"
    },
    plugins: [
       new MiniCssExtractPlugin({
           filename: 'css/[name].[contenthash:8].css',
           chunkFilename:'css/[name].[contenthash:8].chunk.css',
       })
    ]
})


