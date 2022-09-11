const { withFederatedSidecar } = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;

module.exports = withFederatedSidecar({
  name: "next2",
  filename: "static/chunks/remoteMovieEntry.js",
  exposes: {
    "./movieList": "./components/MovieList",
  },
  shared: {
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
})({
  // your original next.config.js export
});
module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: {
          next2: "next2",
        },
        shared: {
          react: {
            // Notice shared ARE eager here.
            eager: true,
            singleton: true,
            requiredVersion: false,
          }
        },
      })
    );
    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });
    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};