const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./app/index.js",

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "index.js",
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./app/index.html", to: "index.html" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
