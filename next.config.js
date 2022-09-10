/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => { // webpack configurations
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        name:"remote_movies",
        filename: "static/chunks/remoteEntry.js", // remote file name which will used later
        remoteType: "var",
        exposes: { // expose all component here.
          "./movieList": "./pages/index.tsx",
          "./movieDetail": "./pages/movie/[id].tsx"
        },
        shared: [
          {
            react: {
              eager: true,
              singleton: true,
              requiredVersion: false,
            }
          },
          {
            "react-dom": {
              eager: true,
              singleton: true,
              requiredVersion: false,
            }
          },
        ]
      })
    )
    return config
  }
}

module.exports = nextConfig
