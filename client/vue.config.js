const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/graphql': {
        target: 'https://vue-graphql-app2.herokuapp.com',
        changeOrigin: true
      }
    }
  }
})
