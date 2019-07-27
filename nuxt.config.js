// При изменении файла перезапустить сборку вручную

module.exports = {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Прогресс бар
  loading: { color: '#66b1ff' },

  css: [
    'element-ui/lib/theme-chalk/index.css',

    // Наш добавленный файл
    '@/theme/index.scss'
  ],

  // В плагинах установка UI фреймворка и не только
  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  // Опции PWA
  workbox: {
    
  },

  // Конфигурация axios
  axios: {
    // Базовая url
    // process.env.BASE_URL - при продакшн
    baseURL: process.env.BASE_URL || 'http:/localhost:3000'
  },

  env: {
    appName: 'SSR Blog'
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {
    }
  }
}
