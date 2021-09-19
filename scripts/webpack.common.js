const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {ROOT_PATH} = require('./consts')

module.exports={
    entry: {
        app: path.resolve(ROOT_PATH,'./src/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH,'./public/index.html')
        })
    ]
}