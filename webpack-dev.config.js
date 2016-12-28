'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_EYE_EXERCISE_DURATION: "10",    // 10 seconds
  DEFAULT_LONG_BREAK_DURATION: "20",      // 20 seconds
  DEFAULT_EYE_EXERCISE_INTERVAL: "30",    // 30 seconds
  DEFAULT_LONG_BREAK_INTERVAL: "60"       // 60 seconds
})

baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
