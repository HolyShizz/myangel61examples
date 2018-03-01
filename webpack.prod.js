const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractSCSS = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const cssnano = require('cssnano');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
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
              outputPath: 'dist/',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssnano({
                  reduceIdents: false,
                  discardDuplicates: true,
                  autoprefixer: false,
                  zindex: false,
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputPath: 'dist/',
            },
          }],
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      beautify: false,
      output: { comments: false },
      mangle: { screw_ie8: true },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false,
      },
    }),
  ],
});
