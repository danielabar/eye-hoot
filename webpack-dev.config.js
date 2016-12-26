'use strict';

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.js');

// environment specific config
var definePlugin = new webpack.DefinePlugin({
  DEFAULT_WORK_INTERVAL: "10"
})

baseConfig.plugins.push(definePlugin);

module.exports = baseConfig;
