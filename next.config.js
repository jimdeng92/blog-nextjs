/* global module require __dirname */
const path = require('path')
module.exports = {
  /* config options here */
  distDir: 'build',
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  // exportPathMap: async function () {
  //   return {
  //     '/': { page: '/' },
  //     '/home': { page: '/home' },
  //     '/code': { page: '/code' },
  //     '/essay': { page: '/essay' }
  //     '/essay': { page: '/essay' }
  //     '/essay': { page: '/essay' }
  //   }
  // }
}
