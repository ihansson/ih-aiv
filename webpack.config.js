const path = require('path');
const config = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');

const PROD = true;

module.exports = {
  entry: {
    "aiv": "./src/aiv.js",
    "aiv.min": "./src/aiv.js",
  },
  devtool: 'source-map',
  mode: PROD ? 'production' : 'development',
  optimization: {
    minimize: PROD,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/
    })]
  },
  output: {
    library: 'aiv',
    libraryTarget: 'window',
    path: __dirname,
    filename: 'dist/[name].js'
  },
  module: {
    rules: [
      {test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};