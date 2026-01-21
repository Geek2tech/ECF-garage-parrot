// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // Server-side only (not exposed to client)
        API_KEY: process.env.APP_APIKEY,
        APP_MSM_URL: process.env.APP_MSM_URL,
        public: {
            // Client-side accessible (no secrets here!)
            API_URL: process.env.APP_BACKEND_URL,
            APP_MAIL: process.env.APP_GARAGE_MAIL,
        }
    },

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
        "@nuxtjs/tailwindcss",
        '@pinia/nuxt',
        '@nuxt/ui'
    ],


})
