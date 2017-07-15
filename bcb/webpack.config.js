var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
  dev: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  pro: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  }
}
var configEnv = config.dev;
var pluginsEnv = [];

if (process.env.NODE_ENV == 'production'){
  configEnv = config.pro;
  pluginsEnv = [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from : 'public',
      to: 'public'
    }])
  ]
}



module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: configEnv.path,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].js',
    publicPath: configEnv.publicPath
  },
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
	  {
		  test: /\.css/,
		  loader: ['style-loader', 'css-loader']
	  }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin,
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: true
    })
  ].concat(pluginsEnv)
}
