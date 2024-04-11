const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
let pathsToClean = [
    'dist',
]

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
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
        // new CleanWebpackPlugin(pathsToClean),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
            // {
            //     test: /.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            //     options: {
            //         presets: ['react', 'es2015'],
            //         plugins: ['transform-class-plugins']
            //     }
            // }
        ]
    },
    devServer: {
        port: 9000
    }
}