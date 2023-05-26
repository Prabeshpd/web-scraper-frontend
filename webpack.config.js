var path = require('path');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';

module.exports = {
  devtool: 'source-map',
  mode: isDevelopment ? 'development' : 'production',
  entry: [require.resolve('./polyfills'), './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('source-map-loader'),
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
      },
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  // disable type checker - we will use it in fork plugin
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.module\.s(a|c)ss$/,
            use: [
              isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  sourceMap: isDevelopment,
                  esModule: true,
                  hmr: isDevelopment,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  sourceMap: isDevelopment,
                },
              },
            ],
          },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
              isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
              require.resolve('css-loader'),
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  sourceMap: isDevelopment,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3001,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    devMiddleware: {
      publicPath: 'http://localhost:3001/dist',
    },
    hot: true,
    host: '0.0.0.0',
  },
};
