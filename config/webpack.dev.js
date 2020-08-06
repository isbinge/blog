const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const common = require('./webpack.common');

module.exports = merge([
  common,
  {
    mode: 'development',
  },
  parts.generateSourceMap('cheap-module-eval-source-map'),
  parts.loadTypeScript({
    include: path.resolve(parts.appDirectory, 'src'),
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: '[name].[hash:5].[ext]',
    },
  }),
  parts.loadCSS({
    test: /\.(sc|sa|c)ss$/,
    include: path.resolve(parts.appDirectory, 'src'),
    miniCssExtractConfig: {
      hmr: true,
      reloadAll: true,
    },
    cssLoaderOptions: {
      modules: {
        localIdentName: '[folder]_[name]_[hash:5]',
      },
      sourceMap: true,
    },
    use: [parts.autoprefix(), parts.parseScss({})],
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
  parts.clean(),
]);
