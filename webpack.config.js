process.env.NODE_ENV = process.env.APPMODE;

const config = require("config");
const _ = require("lodash");
const webpackMerge = require("webpack-merge");
const path = require("path");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "topcoder",
    projectName: "micro-frontends-component-poc",
    webpackConfigEnv,
    disableHtmlGeneration: true,
  });

  const unusedFilesWebpackPlugin = defaultConfig.plugins.find(
    (p) => p.constructor.name === "UnusedFilesWebpackPlugin"
  );
  unusedFilesWebpackPlugin.globOptions.ignore.push(
    "**/assets/icons/*.svg",
    "**/__mocks__/**"
  );

  // modify the webpack config however you'd like to by adding to this object
  return webpackMerge.smart(defaultConfig, {
    externals: {
      "@topcoder/micro-frontends-navbar-app": "@topcoder/micro-frontends-navbar-app",
      "react": "react",
      "react-dom": "react-dom",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "component-poc",
    },
    devServer: {
      clientLogLevel: config.LOG_LEVEL,
      hot: true,
      port: 8012,
      host: "0.0.0.0",
    },
  });
};
