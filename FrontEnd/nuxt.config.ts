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
  ssr:false,


  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    },
  },
  colorMode: {
    preference: 'light',

  },
  modules: [
    "@nuxtjs/tailwindcss",'@pinia/nuxt'


  ],

  modules: ['@nuxt/ui'],



})