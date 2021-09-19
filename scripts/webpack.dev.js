const {merge} = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")
const {ROOT_PATH, SERVER_HOST, SERVER_PORT} = require("./consts")

module.exports = merge(common, {
    target:"web",
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(ROOT_PATH, "./dist"),
        filename: "js/[name].js",
        publicPath:'/',
    },
    devServer: {
        historyApiFallback:{
            index:path.join(ROOT_PATH,'./public/index.html')
        },
        host: SERVER_HOST,
        port: SERVER_PORT,
        compress: true,
        open: false,
        hot: true,
    }
})


