const ExtractTextPlugin = require("extract-text-webpack-plugin");

const localCss = new ExtractTextPlugin('styles-local.css');
const globalCss = new ExtractTextPlugin('styles-global.css');


const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: localCss.extract({
          fallback: "style-loader",
          use: [
            'style-loader',
            {loader: 'css-loader', options: {modules: true, importLoaders: 1}},
            'postcss-loader',
          ]
        })
      },
    ]
  },
  plugins: [
    globalCss,
    localCss,
  ]
};

module.exports = config;