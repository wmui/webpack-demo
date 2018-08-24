var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js?[hash]'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            cacheDirectory: true,
            plugins: ['transform-runtime']
          }
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: [require('autoprefixer')] }
          },
          'sass-loader'
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './tmp/tmp.html',
      favicon: './favicon.ico',
      minify:{
        removeComments: false, // 删除注释
        collapseWhitespace: false // 删除空格
      }
    }),
    new ExtractTextPlugin('main.css')
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}