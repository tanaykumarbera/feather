var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LessPluginGroupMediaQueries = require('less-plugin-group-css-media-queries');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
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
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ],
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
  ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new UglifyJSPlugin({
      mangle: {
          except: ['exports']
      }
    }));
} else {
    config.devtool = "#cheap-module-source-map";
    config.watch = true;
}

module.exports = config;
