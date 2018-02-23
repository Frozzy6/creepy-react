const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': '"production"'},
        '__DEBUG': false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: { warnings: false },
        sourceMap: true
      }),
      new BundleAnalyzerPlugin({analyzerMode: 'static'})
    ]
};
