const { merge } = require('webpack-merge'); // 插件引入
const config = require('./webpack.config'); // 引入共用配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true, // 启用压缩（生产模式默认 true）
    minimizer: [
      // 压缩 JS
      new TerserPlugin({
        parallel: true, // 启用多进程压缩
        terserOptions: {
          compress: { drop_console: true }, // 移除 console.log
          format: { comments: false } // 移除注释
        }
      }),
      // 压缩 CSS
      new CssMinimizerPlugin({
        parallel: true, // 启用多进程压缩
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  }
};

module.exports = merge(config, prodConfig); // 共用配置与生产配置合并
