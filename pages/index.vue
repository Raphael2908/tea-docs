<template>
    <section>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap" rel="stylesheet">
    </Head>
        <div class="container mx-auto h-screen relative font-poppins">

            <div class="flex items-center justify-center flex-col h-full">
                <h1 class="text-4xl text-center">Welcome to tea docs.</h1>
                <h1 class="text-xl text-center text-gray-400 pb-5">Can't wait to see what you can brew</h1>
                <Button @click="newDocument" class="mb-5">
                    Let's start writting
                </Button>

            <div class="relative hidden md:block">
                <div class="grid grid-cols-3 grid-rows-3 absolute w-full h-full z-10">
                    <span
                    v-for="index in 9"
                    :key=index
                    @mouseenter="trackCursor(index)"
                    @mouseleave="resetImage">
                    </span>
                </div>
                <img 
                id="hero-landscape" 
                class="max-h-[500px] lg:max-h-[600px] ease-linear duration-500 shadow-2xl transition-transform" 
                src="/Hero-landscape.png" alt="">
            </div>

                <img class="shadow-lg max-h-[300px] md:object-cover block md:hidden" src="/Hero.png" alt="">
            </div>


            <div class="absolute inset-x-0 bottom-0 flex justify-center">
                <ChevronDownIcon class="h-24 w-24 text-stone-500 "/>
            </div>
        </div>

        <div class="min-h-screen px-5 py-5 container mx-auto">
            <h1 class="text-4xl text-center py-5">Browse some tea-docs</h1>
            <!-- Search -->
            <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input v-model="documentId" type="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Find some tea" required>
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                </div>
            </form>
            
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                <div v-for="doc in filterDocs" :key="doc.id" class="min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-stone-100 shadow-2xl border-2 rounded-md">
                    <NuxtLink :to="`docs/${doc.id}`">
                        <div class="h-2/3 flex justify-center items-center">
                            <DocumentTextIcon class="text-stone-500 h-1/3"/>
                        </div>
                        <div class="h-1/3 px-2 flex justify-center flex-col border-t-2">
                            <h1 class="font-poppins text-xl">{{ doc.title }}</h1>
                            <p class="font-poppins font-thin text-lg">{{ doc.id }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </section>

        </div>
    </section>
</template>

<script>
import { ChevronDownIcon, DocumentTextIcon } from '@heroicons/vue/24/solid/index.js'

export default {
    async setup() {
        const { data }  = await $fetch('/api/documents/all')
        return { documents: data }
    },
    components:{
        ChevronDownIcon,
        DocumentTextIcon
    },
    data(){
        return {
            documentId: null
        }
    },
    computed:{
        filterDocs(){
            if(this.documentId == null){
                return this.documents
            }
            return this.documents.filter((element) => {
                return element.id.toString().includes(this.documentId)
            })
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
        }, 
        resetImage(){
            document.querySelector('#hero-landscape').style.transform = `rotateX(${0}deg) rotateY(${0}deg)`
        },
        trackCursor(index){
            const heroLandscape = document.querySelector('#hero-landscape')
            switch (index) {
                case 1:
                        heroLandscape.style.transform = `rotateX(${20}deg) rotateY(${-20}deg)`;       
                    break;
                case 2:
                        heroLandscape.style.transform = `rotateX(${20}deg) rotateY(${0}deg)`;
                    break;
                case 3:
                        heroLandscape.style.transform = `rotateX(${20}deg) rotateY(${20}deg)`;  
                    break;

                case 4:
                        heroLandscape.style.transform = `rotateX(${5}deg) rotateY(${-20}deg)`;  
                    break;

                case 5:
                        heroLandscape.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;  
                    break;

                case 6:
                        heroLandscape.style.transform = `rotateX(${5}deg) rotateY(${20}deg)`;  
                    break;

                case 7:
                        heroLandscape.style.transform = `rotateX(${-20}deg) rotateY(${-20}deg)`;  
                    break;

                case 8:
                        heroLandscape.style.transform = `rotateX(${-20}deg) rotateY(${0}deg)`;  
                    break;

                case 9:
                        heroLandscape.style.transform = `rotateX(${-20}deg) rotateY(${20}deg)`;   
                break;
            
                default:
                        heroLandscape.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;   
            }
        }
    }
}
</script>
