const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        "app.bundle": './src/app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules|\.txt$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            // { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules|\.txt$/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },
    devServer: {
        port: 9000
    }
}