const path = require('path');

module.exports = {
  entry: {
    index: './src/static/js/index.js',  // Entry for merge note page
    start_quiz: './src/static/js/start_quiz/index.js',  // Entry for start quiz page
    quiz: './src/static/js/quiz/index.js',  // Entry for quiz page
  },
  output: {
    path: path.resolve(__dirname, 'src/static/js/dist'),
    filename: '[name].bundle.js',  // [name] will be replaced by the entry key
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/static/js/dist'), // Serve only the output directory
      publicPath: '/static/js/dist/', // Serve files under this path
    },
    compress: true,
    port: 3000,  // Access it via http://localhost:3000
    hot: true,  // Enable Hot Module Replacement (HMR)
    open: true,  // Automatically open the browser on startup
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Test for both JS and JSX files
        exclude: /node_modules/,  // Exclude the node_modules directory
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Use Babel presets
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve JS and JSX extensions
  },
};