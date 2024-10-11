// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  umami: {
    id: '6279ff8a-b42b-43c4-8910-efc5e141bfbb',
    host: 'https://umami-production-0033e.up.railway.app/script.js',
    autoTrack: true,
  },
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  plugins: [
    '~/plugins/mitt',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@formkit/auto-animate',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@formkit/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-umami'
  ],
  runtimeConfig: {
    public: {
      server_base: process.env.SERVER_BASE
    }
  },
  googleFonts: {
    families: {
      Outfit: true
    }
  }
})