const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Giriş dosyanızın yolu
  output: {
    filename: 'bundle.js', // Çıktı dosyanızın adı
    path: path.resolve(__dirname, 'dist'), // Çıktı dizini
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
