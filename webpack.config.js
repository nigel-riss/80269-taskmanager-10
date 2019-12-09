const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `sourse-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 1337,
    // watch: true,
    watchContentBase: true,
  },
};
