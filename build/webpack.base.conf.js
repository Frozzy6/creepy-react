const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');

const ENV = process.env.NODE_ENV || 'development';

console.log(`${chalk.cyan('Webpack building for')}:{${chalk.bold.red(ENV)}`);

module.exports = {
  mode: 'development',
  entry: {
    main: ['./app/main.js'],
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'es2015', 'stage-0', 'stage-2', 'react'],
          plugins: ['transform-runtime', 'transform-object-assign', 'transform-object-rest-spread'],
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /axios$/),
  ],
  stats: { colors: true },
};
