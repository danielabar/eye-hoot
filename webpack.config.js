'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  // Sets relative root directory for "entry" key
  context: path.resolve('js'),

  // Application entrypoint
  entry: ['./index'],

  output: {
    path: path.resolve('docs/js/'),  // directory where bundle will go
    publicPath: 'js/',              // where dev server will serve bundle from, matches index.html
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ],

  // So that requests for root / will serve public/index.html
  // devServer: {
  //   contentBase: 'public'
  // },

  module: {
    loaders: [
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      // sass
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
      },
      // media
      {
        test: /\.(png|jpg|mp3)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  },

  // specify what kind of files can be loaded without having to specify their extensions
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
