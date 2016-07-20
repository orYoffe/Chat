var path = require('path');
var srcPath = path.join(__dirname, 'src');
var webpack = require('webpack');
var buildPath = path.join(__dirname, 'dist/public');

process.env.NODE_ENV = 'production';

module.exports = {
    context: srcPath,
    entry: path.join(srcPath, 'client.js'),
    output: {
      path: buildPath,
      filename: "bundle.js",
      publicPath: "/public/"
    },
    module: {
      preLoaders: [
        {test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /(node_modules|bower_components)/}
      ],
      loaders: [
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'style-loader!css-loader?sourceMap'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets:[ 'es2015', 'react', 'stage-2' ]
          }
        }
      ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
      webpackServer: {
        noInfo: true // Suppress all webpack messages, except errors
      }
    };
