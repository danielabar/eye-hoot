'use strict';

var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

var cleanPlugin = new CleanWebpackPlugin(['docs'], {
  root: path.resolve('./'),
  verbose: true,
  dry: false,
  exclude: ['CNAME', 'owl.ico']
});

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_WORK_INTERVAL: "900"  // 15 * 60
})

baseConfig.plugins.push(cleanPlugin);
baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
