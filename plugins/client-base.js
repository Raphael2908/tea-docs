import { createClient } from "@supabase/supabase-js";


export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const supabase = createClient(config.public.supabaseURL, config.public.supabaseKey,{
        realtime: {
            params: {
              eventsPerSecond: 10,
            },
        },
    })
    return {
        provide: {
          base: supabase
        }
    }
})