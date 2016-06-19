var webpack = require('webpack');
var path = require('path');

module.exports = {

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    entry: {
        app: ['babel-polyfill', './index.js']
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    devtool: 'eval'
}