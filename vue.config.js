const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss', '/Index.vue']
    },
    plugins: [
      new CaseSensitivePathsPlugin()
    ]
  }
}
