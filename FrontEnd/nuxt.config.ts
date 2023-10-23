// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    API_URL:process.env.APP_BACKEND_URL,
    API_KEY:process.env.APP_APIKEY,
    public:{
      API_URL:process.env.APP_BACKEND_URL,
      API_KEY:process.env.APP_APIKEY,
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  modules: ['@pinia/nuxt'],
  modules: ['@nuxt/ui']
})