const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotEnv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const appDirectory = fs.realpathSync(process.cwd());

exports.appDirectory = appDirectory;

exports.loadTypeScript = ({ include, exclude, options, use = [] }) => {
  const tsLoader = {
    loader: 'ts-loader',
    options,
  };
  const loaders = process.env.NODE_ENV === 'production' ? [...use, tsLoader] : [tsLoader];
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include,
          exclude,
          use: loaders,
        },
      ],
    },
  };
};
exports.loadImages = ({ include, exclude, options, use = [] }) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
        ].concat(use),
      },
    ],
  },
});
exports.loadFonts = () => ({
  // Match woff2 in addition to patterns like .woff?v=1.1.1.
  test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: 'url-loader',
    options: {
      // Limit at 50k. Above that it emits separate files
      limit: 50000,

      // url-loader sets mimetype if it's passed.
      // Without this it derives it from the file extension
      mimetype: 'application/font-woff',

      // Output below fonts directory
      name: './fonts/[name].[ext]',
    },
  },
});
exports.devServer = ({ host, port }) => ({
  devServer: {
    host,
    port,
    contentBase: path.resolve(appDirectory, 'dist'),
    stats: true,
    hot: true,
    open: true,
  },
});
exports.page = ({
  output,
  filename,
  title,
  options,
  template = path.resolve(appDirectory, 'src/template.ejs'),
}) => ({
  context: path.resolve(appDirectory, 'src'),
  entry: {
    main: path.resolve(appDirectory, 'src/index.tsx'),
  },
  output,
  plugins: [
    new HtmlWebpackPlugin({
      filename,
      template,
      title,
      ...options,
    }),
  ],
});
