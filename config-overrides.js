const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    zlib: require.resolve('browserify-zlib'),
    os: require.resolve('os-browserify/browser'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url/'),
    fs: false,
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  return config;
};