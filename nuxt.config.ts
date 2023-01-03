// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
    ],

    runtimeConfig: {
        // The private keys which are only available within server-side
        // apiSecret: '123',
        supabaseURL: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        host: process.env.HOST,
        // Keys within public, will be also exposed to the client-side
        public: {
        //   apiBase: '/api'
        supabaseURL: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        }
    },
    app: {
        head:{
            meta: [
                // <meta name="description" content="My amazing site">
                // { name: 'description', content: 'My amazing site.' },
                {'http-equiv': "Content-Security-Policy",  'content': "upgrade-insecure-requests"}
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    serverHandlers: [
        {
            route: '/ws',
            handler: 'server/middleware/server-socket.js'
        }
    ]
    
})
