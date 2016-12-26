'use strict';

var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var devConfig = require('./webpack.config.js');

var cleanPlugin = new CleanWebpackPlugin(['docs'], {
  root: path.resolve('./'),
  verbose: true,
  dry: false,
  exclude: ['CNAME', 'owl.ico']
});

devConfig.plugins.push(cleanPlugin);

module.exports = devConfig;
