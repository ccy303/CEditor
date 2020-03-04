const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  let plugins = []
  if (env === 'development') {
    plugins.push(
      new HtmlWebpackPlugin({
        title: 'answerCard',
        template: './src/index.html'
      })
    )
  }
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      filename: 'ceditor.js',
      path: path.resolve(__dirname, 'dist'),
      libraryExport: "default",
      library: "CEditor",
      libraryTarget: "umd",
      publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 3000,
      // host: '192.168.6.94'
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
}