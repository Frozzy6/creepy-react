import webpack from 'webpack';
import FriendlyErrors from 'friendly-errors-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      '__DEBUG': true,
    }),
    new FriendlyErrors(),
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
};
