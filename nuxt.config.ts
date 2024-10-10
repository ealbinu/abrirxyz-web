// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  gtm: {
    id: 'GTM-K44JD7L9',
    defer: true,
    enableRouterSync: true
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
    '@zadigetvoltaire/nuxt-gtm'
  ],
  runtimeConfig: {
    public: {
      server_base: process.env.SERVER_BASE,
    }
  },
  googleFonts: {
    families: {
      Outfit: true
    }
  }
})