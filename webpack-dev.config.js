'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_EYE_EXERCISE_DURATION: "10",
  DEFAULT_LONG_BREAK_DURATION: "20",
  DEFAULT_EYE_EXERCISE_INTERVAL: "120",
  DEFAULT_LONG_BREAK_INTERVAL: "240"
})

baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
