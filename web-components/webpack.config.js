const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencil = require('@stencil/webpack');

const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    paper: './src/paper.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[contenthash:8].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new stencil.StencilPlugin(),
    new AssetsPlugin({path: path.join(__dirname, 'dist')}),
    new HtmlWebpackPlugin({
      title: 'Setting up webpack 4',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
