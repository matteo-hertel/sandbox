const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const stencil = require("@stencil/webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "components"),
    filename: "app.[contenthash:8].js",
    publicPath: "/assets/components/"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new stencil.StencilPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "components.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
