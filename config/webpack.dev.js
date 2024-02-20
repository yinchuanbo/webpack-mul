const { resolve } = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const routes = require("./route.config.js");

const getEntrys = () => {
  const entryObj = {};
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route?.path) {
      entryObj[route.path] = `./src/js/entry/${route.path}.js`;
    }
  }
  return entryObj;
};

module.exports = {
  entry: {
    common: "./src/js/global/common.js",
    ...getEntrys(),
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "./assets/js/[name].[contenthash:8].js",
    chunkFilename: "./assets/js/[name].chunk.js",
    assetModuleFilename: "./assets/media/[name].[hash][ext]",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(eot|ttf|otf|woff2?)$/,
            type: "asset",
          },
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    ...routes.map((page) => {
      delete page?.path;
      return new HtmlWebpackPlugin(page);
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: {
          minSize: 20000,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
  },
};
