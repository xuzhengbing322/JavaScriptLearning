const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
      autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: __dirname + 'node_modules',
                include: __dirname + 'src',
                options: {
                    'presets': ['env']
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        // options: {
                        //     plugins: function () {
                        //         return [autoprefixer('last 5 versions')]
                        //     }
                        // }
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                // 清除注释
                removeComments: true,
                // 清除空格、换行
                collapseWhitespace: true
            },
            filename: 'index.html',
            // 模版
            template: path.resolve(__dirname, 'src/index.html'),
            excludeChunks: ['node_modules'],
            files: {
                js: ['js/omdex.js'],
                chunks: {
                    'main': {
                        'entry': 'dist/bundle.js'
                    }
                }
            }
        })
    ],
    devServer: {
        // watchOptions: {
        //     ignored: /node_modules/
        // },
        host: 'localhost',
        port: 3000
    }
}