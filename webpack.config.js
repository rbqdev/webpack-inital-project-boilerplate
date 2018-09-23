const path = require('path');
const mode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: mode ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 8888,
        contentBase: path.join(__dirname, 'public'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "build.css"
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/, // sass, scss or css files
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    //'style-loader' Use style loader OR MiniCss Plugin not Both
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}