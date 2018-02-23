const ENV = process.env.NODE_ENV || 'development' ;

const merge = require('webpack-merge');

const base = require('./build/webpack.base.conf');
const conf = require('./build/webpack.' + ENV + '.conf');

module.exports = merge(base, conf);
