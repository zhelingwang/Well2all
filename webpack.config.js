const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  entry: './src/index',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },

  mode: 'development',

  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    hot: true,
    contentBase: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './../dist/index.html',
      template: './src/index.html',
      inject: 'body'
    })
  ]

}