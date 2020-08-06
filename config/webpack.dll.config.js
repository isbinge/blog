const Webpack = require('webpack');
const path = require('path');
const { dependencies } = require('../package.json');

console.log('------------------------');
module.exports = {
  mode: 'production',
  entry: {
    bundle: Object.keys(dependencies || {}),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(process.cwd(), 'dll'),
    filename: '[name].js',
    library: '[name]_library',
  },
  plugins: [
    new Webpack.DllPlugin({
      // context: process.cwd(),
      path: path.resolve(process.cwd(), 'dll', 'manifest.json'),
      name: '[name]_library',
    }),
  ],
};
