const path = require("path");
const glob = require("glob");
const withSass = require("@zeit/next-sass");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;

module.exports = withSass({
  cssModules: false,
  webpack(config, ANALYSE){
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    } else {
      config.module.rules.push(
        {
          test: /\.css$/,
          use: ['css-loader']
        }, {
          test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/',
            outputPath: "static/"
          }
        }
      );
    }
    return config;
  }
});
