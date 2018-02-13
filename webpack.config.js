const path = require("path");
const webpack = require("webpack")

module.exports = {
    entry: "./app/helper.js",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    output: {
        filename: "round-half-even.min.js",
        path: path.resolve(__dirname, "dist"),
        library: "roundHalfEven",
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
