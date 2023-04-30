const path = require("path");
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "round-half-even.min.js",
        path: path.resolve(__dirname, "dist"),
        library: "roundHalfEven",
        libraryTarget: "umd"
    },
};
