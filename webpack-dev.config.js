'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_EYE_EXERCISE_DURATION: "5",
  DEFAULT_LONG_BREAK_DURATION: "60",
  DEFAULT_EYE_EXERCISE_INTERVAL: "60",
  DEFAULT_LONG_BREAK_INTERVAL: "120"
})

baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
