/* global module */
module.exports = {
  /* config options here */
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id'
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
