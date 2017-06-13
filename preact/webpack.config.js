const path = require('path')

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/',
    filename: '[name].bundle.js'
  }
}
