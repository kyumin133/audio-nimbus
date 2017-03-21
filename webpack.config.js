const path = require('path');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  context: __dirname,
  entry: './frontend/sound_hound.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "AudioNimbus Webpack Build",
      logo: path.resolve("./app/assets/images/logopng"),
      suppressSuccess: true
    })
  ],
  devtool: 'source-maps'
};
