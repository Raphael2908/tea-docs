// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    plugins: ['~/plugins/client-socket'],
    runtimeConfig: {
        // The private keys which are only available within server-side
        // apiSecret: '123',
        supabaseURL: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        host: process.env.HOST,
        // Keys within public, will be also exposed to the client-side
        public: {
        //   apiBase: '/api'
        }
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    
})
