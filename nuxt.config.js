const webpack = require('webpack')
const pkg     = require('./package')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta : [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid    : 'description',
        name   : 'description',
        content: pkg.description,
      },
    ],
    link: [
      {
        rel : 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700' },
    ],
  },
  loading: { color: '#fff' },
  css    : ['@/assets/scss/app.scss'],
  plugins: [{ src: '@/plugins/clipboard' }, { src: '@/plugins/notifications', ssr: false }],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    'nuxt-simple-line-icons',
    ['bootstrap-vue/nuxt', { css: false }],
  ],
  axios: { browserBaseURL: '/api', proxy: false },
  // proxy: {
  //   '/api': {
  //     target     : process.env.API_URL,
  //     pathRewrite: { '^/api': '/' },
  //   },
  // },
  build: {
    babel  : { plugins: ['lodash'] },
    loaders: {
      vue: {
        transformAssetUrls: {
          'img'             : 'src',
          'image'           : 'xlink:href',
          'b-img'           : 'src',
          'b-img-lazy'      : ['src', 'blank-src'],
          'b-card'          : 'img-src',
          'b-card-img'      : 'img-src',
          'b-carousel-slide': 'img-src',
          'b-embed'         : 'src',
          'img-viewer'      : 'src',
        },
      },
    },
    plugins: [new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })],
  },
}
