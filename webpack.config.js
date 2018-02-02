const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: "DOS Prompt"
    })
  ],
  module: {
    rules: [
      { test: /\.js$/,
        use: [ 'babel-loader' ] },
      { test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ] }
    ]
  }
};
