// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        API_URL: process.env.APP_BACKEND_URL,
        API_KEY: process.env.APP_APIKEY,
        APP_MAIL: process.env.APP_GARAGE_MAIL,
        APP_MSM_URL: process.env.APP_MSM_URL,
        public: {
            API_URL: process.env.APP_BACKEND_URL,
            API_KEY: process.env.APP_APIKEY,
            APP_MAIL: process.env.APP_GARAGE_MAIL,


        }
    },
    //ssr:false,

    routeRules: {
        '/login': {ssr: false},
    },

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
        "@nuxtjs/tailwindcss", '@pinia/nuxt'


    ],

    modules: ['@nuxt/ui'],


})
