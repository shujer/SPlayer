const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    SPlayer: './src/player.js'
  },

  devtool: 'cheap-module-source-map',

  output: {
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'bubble.html',
      template: path.resolve(__dirname, '..', 'example/bubble.html'),
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader', // ES6
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },

  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'example'),
    open: true,
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  performance: {
    hints: false
  }
}
