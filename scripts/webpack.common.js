const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackBar = require("webpackbar")
const {ROOT_PATH} = require('./consts')
const {isDevelopment} = require("./env");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getCssLoaders = () => [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: "[local]--[hash:base64:5]"
            },
            sourceMap: isDevelopment
        }
    }
]

module.exports = {
    entry: {
        app: path.resolve(ROOT_PATH, './src/index.js')
    },
    module: {
        rules: [
            {test: /\.css$/, use: [...getCssLoaders()]}
        ]
    },
    plugins: [
        new WebpackBar({name: "loading...", color: '#52c41a'}),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, './public/index.html')
        })
    ]
}