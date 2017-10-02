const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'src/app/dist');
const APP_DIR = path.resolve(__dirname, 'src/app');

module.exports = {
  target: 'electron-main',
  entry: [
    `${APP_DIR}/index.js`,
  ],
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
  },
  node: {
    __dirname: false,
    child_process: false,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
        include: APP_DIR,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: APP_DIR,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
