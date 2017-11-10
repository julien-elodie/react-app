const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    publicPath: "/dist/",
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
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
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
          "url-loader?limit=8192&name=img/[name]-[hash:5].[ext]",
          "image-webpack-loader"
        ]
      }
    ]
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      jquery: path.resolve(
        __dirname,
        "client/src/public/jquery-3.2.1/jquery-3.2.1.min.js"
      ),
      bootstrap: path.resolve(
        __dirname,
        "client/src/public/bootstrap-3.3.7/js/bootstrap.min.js"
      )
    },
    descriptionFiles: ["package.json"]
  },

  context: __dirname,

  externals: ["react", "react-dom"],

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/vendor.js",
      minChunks: Infinity
    })
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
    filename: "./client/view/" + pathname + ".html",
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
