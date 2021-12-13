// Webpack.config.js
const {resolve} = require('path');
const MinCssExtractPlugin = require('min-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义node环境变量，决定使用browserslist 哪个环境
//process.env.NODE_ENV = 'production';

//复用loader
const commonCssloader = [
    MinCssExtractPlugin.loader,
    'css-loader',         
    {
        //兼容性处理需要在 package.json 定义 browserslist
        loader: 'postcss-loader',
        Options: {
            ident: 'postcss',
            plugins: ()=>[
                require['postcss-preset-env']
            ]
        }
    },
];


module.exports = {
    entry: './src/index.js',
    output: {
    	filename: 'built.js',
    	path: resolve(__dirname,'build')
	},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssloader]
            },
            {
                test: /\.less$/,
                 // loader 会从下往上执行，less-loader把less转换为css
                use: [...commonCssloader, 'less-loader'],
            },
            {
                // 语法检查
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                Options: {
                    fix: true
                },
            },
            {
                // babel 兼容性处理
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                Options: {
                    presets: [
                        // 基本配置
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: {version: 3},
                            targets: {
                                chrome: '60',
                                firefox: '50'
                            }
                        }
                    ]
                },
            },
            {
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                Options: {
                    // 8*1024b
                    limit: 8*1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false 
                }
            },
            {
                test: /\.html$/,
                // html-loader 使用的模块化为 common.js, 与url-loader 的ES6 冲突
                loader: 'html-loader'
            },
            {
                // 其他文件统一处理
                exclude: /\.(js|css|less|html|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ]
    },
  	plugins: [
          new MinCssExtractPlugin({
              filename: 'css/built.css'
          }),
          new OptimizeCssAssetsWebpackPlugin,
          new HtmlWebpackPlugin({
              template: './src/index.html',
              minify: {
                  collapseWhitespace: true,
                  removeComments: true
              }
          })
    ],
    mode: 'production'
};
