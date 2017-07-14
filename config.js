const fs = require("fs");
const path = require("path");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { UglifyJsPlugin } = require("webpack").optimize;

// Generic settings
const settings = {
  assets: {
    name: "assets",
    freqlist: "node_modules/zxcvbn-typescript/frequency_list.json",
    files: [
      "node_modules/react/dist/react.js",
      "node_modules/react-dom/dist/react-dom.js",
      "node_modules/react-router-dom/umd/react-router-dom.js",
      "node_modules/zxcvbn-typescript/dist/zxcvbn-typescript.external.js"
    ],
    files_build: [
      "node_modules/react/dist/react.min.js",
      "node_modules/react-dom/dist/react-dom.min.js",
      "node_modules/react-router-dom/umd/react-router-dom.min.js",
      "node_modules/zxcvbn-typescript/dist/zxcvbn-typescript.external.js"
    ]
  },
  style: "main.css",
  distribution: "dist"
}

// Shared webpack plugins
const plugins = [
  new ExtractTextPlugin(settings.style),
  new CheckerPlugin()
];

// Shared webpack settings
const webpack = {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
    path: `${__dirname}/${settings.distribution}`
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    alias: {
      "~": `${__dirname}/src`
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "sass-loader"
          }]
        })
      }
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "zxcvbn-typescript": "Zxcvbn"
  }
}

// Webpack settings for watch / develop mode
const webpack_watch = {
  watch: true,
  plugins: [
    ...plugins,
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: {
        baseDir: [`./${settings.distribution}`],
        middleware: function (req, res, next) {
          // Check if the file exists as we are using router with pushstate, trimming the querystring
          var fileName = req._parsedUrl.href.replace(/(\?.*)$/, "");
          var fileExists = fs.existsSync(`dist${fileName}`) || fs.existsSync(`${fileName.slice(1)}`);
          if (!fileExists && fileName.indexOf("browser-sync-client") < 0)
            req.url = "./index.html";
          return next();
        }
      }
    })
  ]
};

// Webpack settings for building / release
const webpack_build = {
  plugins: [
    ...plugins,
    new UglifyJsPlugin()
  ]
}

// styleguidist settings
const styleguidist = {
  title: "nhum.nl",
  template: "./styleguidist.html",
  components: "src/components/**/*.tsx",
  webpackConfig: {
    watch: true,
    plugins: plugins
  },
  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
  propsParser: require("react-docgen-typescript").parse
}

Object.assign(styleguidist.webpackConfig, webpack);
Object.assign(webpack_watch, webpack);
Object.assign(webpack_build, webpack);

module.exports = {
  webpack_watch: webpack_watch,
  webpack_build: webpack_build,
  settings: settings,
  styleguidist: styleguidist
};