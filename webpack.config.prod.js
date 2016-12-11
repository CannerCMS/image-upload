var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: './docs/index.js',
  output: {
    path: path.join(__dirname, 'docs/static'),
    filename: 'bundle.js',
    libraryTarget: 'var'
  },
  externals: {
    'react': "React",
    'react-dom': "ReactDOM"
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: true
      }
    }),
    new webpack.BannerPlugin('This file is created by Canner. Built time: ' + // eslint-disable-line max-len
      new Date())
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  }
};
