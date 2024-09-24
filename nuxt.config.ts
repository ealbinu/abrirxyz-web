// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@formkit/auto-animate',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/image'
  ]
})