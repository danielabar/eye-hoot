'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // Application entrypoint
  entry: ['./js/index'],

  output: {
    path: path.resolve('docs/'),    // directory where bundle will go
    publicPath: '/',                // where dev server will serve bundle from
    filename: 'bundle-[hash].js'    // rev the bundle for cache busting
  },

  plugins: [
    // generate a rev'd css file
    new ExtractTextPlugin('styles-[hash].css'),
    // generate index.html with rev'd assets injected
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
    })
  ],

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
      // media, DataUrl if file is smaller than 15kb
      {
        test: /\.(png|jpg|mp3)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=15000'
      }
    ]
  },

  // specify what kind of files can be loaded without having to specify their extensions
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
