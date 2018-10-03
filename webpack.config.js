const path = require('path');

module.exports = {
  entry: {
    dist: './src/index.js',
    docs: './src/index.js',
  },
  output: {
    path: __dirname,
    filename: '[name]/bundle.js',
    library: 'LogTalk',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        },
      },
    ]
  }
}
