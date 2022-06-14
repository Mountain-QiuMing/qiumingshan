const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

/** @type{import('webpack').Configuration}*/
module.exports = {
  entry: ['webpack/hot/poll?100', './src/server/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: true,
              dynamicImport: true,
            },
            paths: {
              'src/*': ['src/*'],
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
            },
          },
        },
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new RunScriptWebpackPlugin({ name: 'server.js' })],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  stats: 'minimal',
};
