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
  DEFAULT_WORK_INTERVAL: "900",                 // 15 * 60 = 15 minutes
  DEFAULT_TIME_TO_LONG_BREAK: "3600",           // 60 * 60 = 1 hour
  DEFAULT_LONG_BREAK_ANIMATION_INTERVAL: "300"  //  5 * 60 = 5 minutes
})

baseConfig.plugins.push(cleanPlugin);
baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
