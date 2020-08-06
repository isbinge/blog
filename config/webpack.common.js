const path = require('path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    resolve: {
      modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.ejs'],
    },
  },
  parts.dontParse({ name: '@', path: path.resolve('src') }),
  parts.dontParse({ name: '@comps', path: path.resolve('src/components') }),
]);
