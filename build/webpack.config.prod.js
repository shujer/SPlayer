const path = require('path')
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
