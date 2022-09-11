const {
  withModuleFederation,
} = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;
module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const mfConf = {
      mergeRuntime: true, //experimental
      name: "movies",
      library: {
        type: config.output.libraryTarget,
        name: "movies",
      },
      filename: "static/chunks/remoteMovieEntry.js",
      remotes: {
      },
      exposes: {
        "./movieList": "./components/MovieList",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        },
        "query-string": {
          singleton: true,
          requiredVersion: deps["query-string"]
        },
        "react-query": {
          singleton: true,
          requiredVersion: deps["react-query"]
        }
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};