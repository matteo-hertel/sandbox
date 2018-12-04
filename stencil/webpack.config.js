const stencil = require("@stencil/webpack");
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "bundle"),

    filename: "bundle.js",
    publicPath: "/bundle/"
  },
  plugins: [new stencil.StencilPlugin()]
};
