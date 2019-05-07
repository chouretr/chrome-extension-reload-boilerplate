const { resolve } = require("path");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackChromeReloaderPlugin = require("webpack-chrome-extension-reloader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV;
module.exports = {
  mode,
  devtool: "inline-source-map",
  entry: {
    app: "./src/content/App.js",
    content: "./src/content/content.js",
    background: "./src/background/background.js"
  },
  output: {
    publicPath: ".",
    path: resolve(__dirname, "dist/"),
    filename: "[name].js",
  },
  plugins: [
    /***********************************************************************/
    /* By default the plugin will work only when NODE_ENV is "development" */
    /***********************************************************************/
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackChromeReloaderPlugin(),
    new CopyWebpackPlugin([
      { from: "./manifest.json" },
      { from: "./icons" }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ]
  }
};
