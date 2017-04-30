var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LessPluginGroupMediaQueries = require('less-plugin-group-css-media-queries');

module.exports = {
  entry: './source/client.jsx',
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: 'scripts/feather.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /(node_modules|assets)/,
        test: /\.jsx?$/,
        use: 'eslint-loader'
      }, {
        exclude: /(node_modules|assets)/,
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader', {
              loader: "less-loader",
              options: {
                plugins: [ LessPluginGroupMediaQueries ]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/feather.css',
      allChunks: true
    })
  ],
  devtool: 'source-map',
  watch: true
}
