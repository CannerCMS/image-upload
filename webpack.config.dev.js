var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './docs/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.css$/,
        loaders: [
          "style",
          "css"
        ],
        exclude: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        loaders: [
          "style?sourceMap",
          "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
          "resolve-url",
          "sass?sourceMap"
        ],
        exclude: [/\.lib\.scss$/, /\.antd\.scss/]
      },
      {
        test: [/\.lib\.scss$/, /\.antd\.scss$/],
        loaders: [
          "style",
          "css",
          "sass"
        ]
      }
    ]
  }
};
