const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencil = require('@stencil/webpack');

const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[contenthash:8].js',
    publicPath: '/assets/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new stencil.StencilPlugin(),
    new AssetsPlugin({path: path.join(__dirname, 'dist')}),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'components.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
