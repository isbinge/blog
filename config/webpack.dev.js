const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    mode: 'development',
  },
  parts.loadTypeScript({
    include: path.resolve(parts.appDirectory, 'src'),
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: '[name].[hash:5].[ext]',
    },
  }),
  parts.page({
    output: {
      filename: '[name].[hash:5].js',
      chunkFilename: '[name].[contenthash:5].js',
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
  parts.devServer({
    port: process.env.port,
    host: process.env.host,
  }),
]);
