const path = require("path");
// * plugin 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = env => {

  return {
    mode: env.NODE_ENV,
    devtool: 'inline-source-map',
    
    entry: {
      app: [
        '@babel/polyfill',
        './src/index.js'
      ],
      // another: './src/another-module.js',
      // index: { import: './src/index.js', dependOn: 'shared' },
      // another: { import: './src/another-module.js', dependOn: 'shared' },
      // shared: 'lodash',
    },
    //devtool 배포용 옵션은 'cheap-module-source-map'
    //devtool 개발용 옵션은 'inline-source-map'

    devServer: {
      contentBase: './dist',
    },


    output: {
      // filename: "bundle.js",
      filename: '[name].[contenthash].js',
      //node_modules에 있는 module 사용 시 상단에 import를 하면 메모리 낭비로 이어질 수 있다.
      //해당 파일이 메모리 올라가면 해당 모듈도 같이 계속 같이 떠있는것과 같으니
      //사용 시에만 import문을 이용해 사용하게 하는 설정
      //ex:: import('lodash').then(({ default: _ }) =>  _.join(['hello', 'webpack'], ' '))
      //ex:: const { default: _ } = await import('lodash')
      chunkFilename: '[name].[contenthash].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },


    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    resolve: {
      modules: [
        'node_modules'
      ],
      extensions: ['.js', '.json', '.jsx', 'css'],
      alias: {
        '@': './src'
      }
    },


    plugins: [
      //HtmlWebpackPlugin:: index.html 기반으로 빌드
      //param은 만드어질 index.html 설정 디테일 설정은 https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        title: 'HELLO Management',
      }), 
      //CleanWebpackPlugin:: dist 폴더(빌드 될 폴더) 비우고 재빌드
      //자세한 디테일 설정은 https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
      // new CleanWebpackPlugin(),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],

    // * loader
    //css/image/font/csv/xml 파일 등 로더
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {node: 'current'},
                  modules: false,
                }
              ],
              '@babel/preset-react',
            ],
          },
          exclude: ['/node_modules'],
        },
    //     {
    //       test: /\.css$/,
    //       use: [
    //         'style-loader',
    //         'css-loader',
    //       ]
    //     },
    //     {
    //       test: /\.(png|svg|jpg|gif)$/,
    //       use: [
    //         'file-loader',
    //       ]
    //     },
    //     {
    //       test: /\.(woff|woff2|eot|ttf|otf)$/,
    //       use: [
    //         'file-loader',
    //       ]
    //     },
    //     {
    //       test: /\.(csv|tsv)$/,
    //       use: [
    //         'csv-loader',
    //       ]
    //     },
    //     {
    //       test: /\.xml$/,
    //       use: [
    //         'xml-loader',
    //       ]
    //     },
      ]
    },

  };
}
