// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             uglifyOptions: {
    //                 compress: {
    //                     // Disable certain compression options that can cause issues
    //                     // with certain libraries and frameworks
    //                     ecma: 5,
    //                     warnings: false,
    //                     comparisons: false,
    //                     inline: 2,
    //                     drop_console: true,
    //                     drop_debugger: true,
    //                     dead_code: true,
    //                 },
    //                 output: {
    //                     ecma: 5,
    //                     comments: false,
    //                     ascii_only: true,
    //                 },
    //             },
    //             sourceMap: true, // Generate source maps
    //             parallel: true, // Use multi-process parallel running to improve the build speed
    //             cache: true, // Enable caching for improved rebuild speed
    //             extractComments: true, // Extract comments to a separate file
    //         }),
    //     ],
    // },
    plugins: [new HtmlWebpackPlugin({
        // title: 'hello world, goodbye world'
        template: './src/index.html',
        minify: {
            collapseWhitespace: true
        },
        hash: true
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    }
}