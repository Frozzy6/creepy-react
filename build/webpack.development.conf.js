const webpack = require('webpack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {'NODE_ENV': '"development"'},
            '__DEBUG': true
        }),
        new FriendlyErrors(),
        // new BundleAnalyzerPlugin({analyzerMode: 'static'})
    ]
};
