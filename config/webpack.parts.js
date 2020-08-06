const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotEnv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const appDirectory = fs.realpathSync(process.cwd());

exports.appDirectory = appDirectory;

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
