const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MIniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    "presets": ["latest"]
                }
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MIniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                loaders: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            title: '商城轮播图',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['index'],
            hash: true
        }),
        new MIniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    devSever: {
        watchOptions: {
            ignored: /node_modules/
        },
        host: 'localhost',
        port: 3300
    }
}

module.exports = config