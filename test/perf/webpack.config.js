const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('../../webpackBaseConfig');

module.exports = {
  ...webpackBaseConfig,
  entry: path.resolve(__dirname, 'index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../tmp'),
    filename: 'tests.js',
  },
  module: {
    ...webpackBaseConfig.module,
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ]),
  },
  resolve: {
    ...webpackBaseConfig.resolve,
    alias: {
      ...webpackBaseConfig.resolve.alias,
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
};
