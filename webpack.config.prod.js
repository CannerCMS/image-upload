var path = require('path');
var webpack = require('webpack');
const theme = require('@canner/canner-theme');

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
        test: /\.less$/,
        loaders: [
          "style",
          "css",
          // atnd themes
          // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          `less?{"modifyVars":${JSON.stringify(theme)}}`
        ]
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
