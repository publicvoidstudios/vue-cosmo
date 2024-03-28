const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://82.97.247.7:3000',
        changeOrigin: true
      }
    },
    allowedHosts: [
        'localhost',
        'cosmmedic.ru',
        '82.97.247.7'
    ]
  }
})
