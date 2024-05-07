const path = require('path');

module.exports = {
  entry: './src/static/js/index.js',
  output: {
    path: path.resolve(__dirname, 'src/static/js/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
};