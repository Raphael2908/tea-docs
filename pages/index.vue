<template>
    <section class="flex items-center justify-center flex-col h-screen gap-5 container mx-auto">
        <h1 class="text-4xl text-center">Welcome to tea docs</h1>
        <Button @click="newDocument">
            Let's start writting
        </Button>
    </section>
</template>

<script>
export default {
    setup() {
        
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
