const path = require('path');
const merge = require("webpack-merge");


const config = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {"modules": false}], 'react'],
            plugins: ['transform-decorators', 'transform-object-rest-spread', 'react-hot-loader/babel']
          }
        }
      },
    ]
  },
};

module.exports = merge([config]);