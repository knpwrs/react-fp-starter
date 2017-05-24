const webpack = require('webpack');
const { join } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const context = __dirname;
const host = 'localhost';
const port = 8080;

const config = {
  context,
  entry: [
    './src/index.jsx',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: join(context, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  plugins: [
    new HtmlPlugin({
      title: 'React FP Starter',
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval-source-map';
  config.entry.unshift('react-hot-loader/patch');
  config.output.publicPath = `http://${host}:${port}/`;
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );
  config.devServer = {
    host,
    port,
    hot: true,
    historyApiFallback: true,
  };
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new BabiliPlugin({}, {
      parserOpts: {
        plugins: ['dynamicImport'],
      },
    }),
  );
}

module.exports = config;
