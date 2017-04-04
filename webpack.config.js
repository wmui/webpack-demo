// html压缩
var HtmlWebpackPlugin = require('html-webpack-plugin');
// js css分离
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

module.exports = {
	// 配置入口文件
  entry: {
  	build: './src/main.js'
  },

  // 配置输出路径
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/dist/',//指定资源引用目录
    filename: '[name].js'
  },

  // loader模块配置
  module: {
    loaders: [
    	// js 文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // css 文件
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
         })
      },
      //解析.scss文件
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      // 字体
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // 插件配置
  plugins: [
      new HtmlWebpackPlugin({
          template: './index.html' // 模版文件
      }),
      new ExtractTextPlugin({
      	filename: 'style.css'
      	/*filename: (getPath) => {
      		return getPath('dist/[name].css').replace('dist','css')
      	}*/
      })
  ],
  // webpack-dev-server 热加载
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}