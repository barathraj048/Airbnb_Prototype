const path = require('path');

module.exports = {
  // Your webpack configuration options here
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/')
    }
  },
  // Other webpack configuration options here
};
