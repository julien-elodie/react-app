const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcPath = path.resolve(__dirname, "client/src");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const getEntry = (globPath, type) => {
  var entries = {
    vendor: ["react", "react-dom", "jquery", "bootstrap", "./client/src/app"]
  };
  glob.sync(globPath).forEach(function(entry) {
    var pathname = entry.split("/").splice(-1);
    entries[pathname] = glob.sync(globPath + "/*." + type);
  });
  console.log("> entries:");
  console.log(entries);
  return entries;
};

const entries = getEntry("./client/src/views/*", "js");
const chunks = Object.keys(entries);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "js/[name].js",
    publicPath: "../dist/",
    chunkFilename: "chunk/[name].chunk.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [srcPath],
        exclude: [nodeModulesPath],

        // issuer: { test, include, exclude },

        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          "url-loader?limit=10000&name=img/[name].[ext]",
          "image-webpack-loader"
        ]
      },
      // bootstrap
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=static/[name].[ext]"
      },
      {
        test: /\.woff2?$/,
        loader: "url-loader?prefix=font/&limit=5000&name=static/[name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=static/[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=static/[name].[ext]"
      }
    ]
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      // 第三方库
    },
    descriptionFiles: ["package.json"]
  },

  context: __dirname,

  externals: {
    jquery: "jQuery"
  },

  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true
  },

  devServer: {
    /**
     * 启用代理,后端处理路由
     */
    proxy: {
      "/api": "http://localhost:3000/"
    },
    contentBase: path.join(__dirname, "client/public"),
    compress: true,
    hot: true
    // port:3000
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react",
      ReactDOM: "react-dom"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/vendor.js",
      minChunks: Infinity
    }),
    new ExtractTextPlugin("css/[name].css")
  ],

  watch: true,

  watchOptions: {
    aggregateTimeout: 1000,

    poll: true,
    poll: 500
  }
};

chunks.forEach(function(pathname) {
  if (pathname == "vendor") {
    return;
  }
  var conf = {
    filename: "../view/" + pathname + ".html",
    template: "./client/src/template.html",
    inject: "body",
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ["vendor", pathname];
    conf.hash = false;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});
