const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "dist/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      { test: /\.otf(\?[a-z0-9]+)?$/, loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]' },
      { test: /\.woff(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.+)?$/, loader: "file-loader" },
      { test: /\.(svg|jpe?g|png|gif)(\?.+)?$/, loader: "file-loader", options: { esModule: false } },
      { test: /\.cur(\?.+)?$/, loader: "file-loader" },
      { test: /\.wav?$/i, loader: "file-loader", options: { outputPath: 'assets/' } },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "txt"],
    // alias: {
    //   "moment": path.resolve(__dirname, "../node_modules/moment"),
    //   "highcharts": path.resolve(__dirname, "../node_modules/highcharts"),
    //   "@types/prop-types": path.resolve(__dirname, "../node_modules/@types/prop-types"),
    //   "@types/react": path.resolve(__dirname, "../node_modules/@types/react"),
    //   "jquery-easing": "jquery.easing/jquery.easing.min.js",
    //   "jquery": path.resolve(__dirname, "../node_modules/jquery"),
    // },
    modules: [
      "node_modules",
      path.resolve(__dirname, "../node_modules"),
      path.resolve(__dirname, "../src/tsx")
    ]
  },

  stats: {
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    assets: false
  },

  node: {
    child_process: "empty",
    tls: "empty",
    net: "empty",
    fs: "empty"
  },

  devServer: {
    port: 9000,
    open: false,
    hot: true,
    compress: true,
    overlay: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        router: () => "http://localhost:5000",
        logLevel: "debug",
      }
    }
  }
};

module.exports = config;