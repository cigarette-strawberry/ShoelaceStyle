const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: '[name]/[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // Bundle styles into main.css
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer') // 启用 autoprefixer
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除无需编译的目录
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'] // 使用预设
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource', // 使用 Webpack 5 内置资源模块
        generator: {
          filename: 'assets/[name][ext]' // 输出路径和文件名格式
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 这里设置自己模板文件
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        // Copy Shoelace assets to dist/shoelace
        {
          from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          to: path.resolve(__dirname, 'dist/shoelace/assets')
        },
        {
          from: 'src/assets', // 源目录
          to: 'assets' // 输出目录（相对于 output.path）
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
