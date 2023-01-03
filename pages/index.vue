<template>
    <section>
        <div class="container mx-auto h-screen relative">
            <div class="flex items-center justify-center flex-col h-full gap-5">
                <h1 class="text-4xl text-center">Welcome to tea docs</h1>
                <Button @click="newDocument">
                    Let's start writting
                </Button>
            </div>
            <div class="absolute inset-x-0 bottom-0 flex justify-center">
                <ChevronDownIcon class="h-24 w-24 text-stone-500 "/>
            </div>
        </div>

        <!-- <div class="min-h-screen">
            <h1 class="text-4xl text-center py-5">Browse some tea-docs</h1>
                <div v-for="doc in documents">
                    <h1>doc</h1>
                </div>

        </div> -->
    </section>
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
export default {
    async setup() {
        // const documents = useFetch('/api/documents/index')
        // return {documents: documents.data.value}
    },
    components:{
        ChevronDownIcon
    },
    props:{
        documents: {
            Type: Object, 
            default: () => {}
        }
    },
    methods: {
        async newDocument(){
            const res = await useFetch('/api/documents/new', {
                method: 'POST',
                body: {
                    title: null
                }
            })  

            if (!res.data.value) {
                throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
            }
            navigateTo(`/docs/${res.data.value[0].id}`)
        }
    }
}
</script>
