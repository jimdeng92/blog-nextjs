/* global module require __dirname */
const path = require('path')

module.exports = {
  /* config options here */
  distDir: 'build',
  generateBuildId: async () => {
    return 'my-build-id'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  }
}
