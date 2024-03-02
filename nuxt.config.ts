import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "/assets/styles/style.scss" as *;'
        }
      }
    },
    plugins: [
      createSvgSpritePlugin({
        symbolId: '[name]',
      }),
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-mongoose',
    'nuxt-quasar-ui',
  ],
  runtimeConfig: {
    mongoUrl: 'mongodb+srv://admin:Hora1234@cluster0.ouwqb.mongodb.net/nuxt?retryWrites=true&w=majority',
  },
  nitro: {
    plugins: ["~/server/index.ts"]
  },
  app: {
    head: {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
          type: "text/javascript"
        },
      ]
    }
  },
})
