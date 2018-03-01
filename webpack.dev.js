const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractSCSS = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    compress: true,
    port: 5000,
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractSCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              outputPath: 'src/',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputPath: 'src/',
            },
          }],
        }),
      },
    ],
  },
});
