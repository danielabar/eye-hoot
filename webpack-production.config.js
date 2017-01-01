'use strict';

var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

var cleanPlugin = new CleanWebpackPlugin(['docs'], {
  root: path.resolve('./'),
  verbose: true,
  dry: false,
  exclude: [
    'CNAME',
    'owl.ico',
    'owl-small.png'
  ]
});

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_EYE_EXERCISE_DURATION: "15",    // 15 seconds
  DEFAULT_LONG_BREAK_DURATION: "300",     // 5 * 60 = 5 minutes
  DEFAULT_EYE_EXERCISE_INTERVAL: "900",   // 15 * 60 = 15 minutes
  DEFAULT_LONG_BREAK_INTERVAL: "3600"     // 60 * 60 = 1 hour
})

baseConfig.plugins.push(cleanPlugin);
baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
