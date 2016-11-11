const webpack = require('webpack');
const path = require("path");

module.exports = {
  // entry: [
  //   './public/entry.jsx',
  //   'webpack-hot-middleware/client'
  // ],
  entry: {
    entry: "./public/entry.js",
    admin: "./public/admin.js"
  },
  output: {
    path: path.join(__dirname, '/assets/'),
    publicPath: '/assets/',
    filename: '[name].bundle.js',
    chunkFilename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', 'jsx']
  },
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
          chunks: ['vendors','entry','admin'], //提取哪些模块共有的部分
          minChunks: 3 // 提取至少3个模块共有的部分
      }),
  ]
}