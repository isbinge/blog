const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    mode: 'development',
  },
  parts.page({
    output: {
      filename: '[name].[hash:5].hash.js',
      chunkFilename: '[name].[contenthash:5].contenthash.js',
      path: path.resolve(parts.appDirectory, 'dist'),
      publicPath: '/',
    },
    title: 'demo2',
    filename: 'index.html',
    options: {
      inject: true,
      cdn: [
        'https://unpkg.com/react@16.13.1/umd/react.development.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
      ],
    },
  }),
]);
