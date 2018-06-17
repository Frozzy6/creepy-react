import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      '__DEBUG': false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: { warnings: false },
      sourceMap: true,
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
};
