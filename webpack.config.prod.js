var path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './frontend/sound_hound.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
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
      },
      {
        test: require.resolve("wavesurfer.js"),
        loader: "expose?WaveSurfer"
      }
    ]
  },
  node: {
    fs: "empty",
    child_process: "empty"
  },
  devtool: 'source-maps'
};
