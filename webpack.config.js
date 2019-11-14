const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/main/main.js"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          }
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  target: "node"
};