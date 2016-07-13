var pkg = require('./package.json');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    sources : './src/sources/sources.js'
  },
  output: {
    path: './dist',
    filename: 'vconsole-[name].min.js',
    library: 'vConsole-sources',
    libraryTarget: 'umd',
    umdNameDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.html$/, loader: 'html?attrs=false'
      },
      { 
        test: /\.js$/, loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') // 将css独立打包
      }
    ]
  },  
  htmlLoader: {
    ignoreCustomFragments: [/\{\{.*?}}/]
  },
  plugins: [
    new webpack.BannerPlugin([
        pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
        'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
        pkg.license +' license'
    ].join('\n'))
    ,new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    // ,new ExtractTextPlugin('[name].min.css') // 将css独立打包
  ]

};