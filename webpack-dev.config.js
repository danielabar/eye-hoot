'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_WORK_INTERVAL: "10",
  DEFAULT_TIME_TO_LONG_BREAK: "20",
  DEFAULT_LONG_BREAK_ANIMATION_INTERVAL: "15"
})

baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
