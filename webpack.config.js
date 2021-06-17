const path = require('path')

const webpack = require('webpack')
//生成一个html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
//启动时清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//单独打包css，不使用style标签，自动使用Link标签
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const ENV = process.env.NODE_ENV
module.exports = {
  entry: {
    index: './src/index.js', //基础配置
  },
  ...(ENV === 'production' ? {} : { devtool: 'eval-cheap-module-source-map' }),
  devServer: {
    contentBase: './dist',
    hot: true,
    // host: '0.0.0.0',
    open: true,
    historyApiFallback: true,
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://qqmusic.rayhomie.icu/',
        pathRewrite: {
          //将/api开头的，'/api'改成'api'
          '^/api': '',
        },
        changeOrigin: true, //跨域请求
      },
    },
  },
  mode: 'development',
  output: {
    filename: '[name]_[hash].bundle.js',
    path: path.join(__dirname, 'dist'), //打包到的文件夹
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, './src/'), 'node_modules'],
    //告诉 webpack 解析模块时应该搜索的目录，即 require 或 import 模块的时候，只写模块名的时候，到哪里去找，其属性值为数组，因为可配置多个模块搜索路径，其搜索路径必须为绝对路径，
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      cache: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[chunkhash:8].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll', 'react.manifest.json'),
    }),
    ...(ENV === 'production' ? [new BundleAnalyzerPlugin()] : []),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    ...(ENV === 'production' ? { minimize: true } : {}),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: '3',
                  useBuiltIns: 'usage',
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(jpg|jpeg|png)$/,
        exclude: /node_modules/,
        use: {
          //使用url-loader，自动把图片转成base64的文件格式
          loader: 'url-loader',
          options: {
            limit: 100,
            name: '[name]_[hash].[ext]', //使用原先的文件名和后缀名
            outputPath: 'images/', //（匹配到的静态图片放到dist目录的imges下）
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader' }],
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'src/style')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]',
              },
              // javascriptEnabled: true,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/style'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(eot|woff|ttf|svg)/,
        include: [path.resolve(__dirname, 'src/font')], //只处理src下的font文件夹
        use: {
          loader: 'file-loader',
          options: { outputPath: 'font/' }, //打包到dist下的font文件夹
        },
      },
    ],
  },
}
