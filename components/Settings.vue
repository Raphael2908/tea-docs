<template>
    <section class="mx-auto container px-4">
        <!-- Logo -->
        <NuxtLink to="/">
            <h1 class="text-xl">{{ name }}</h1> 
        </NuxtLink>

        <!-- Tools -->
        <ul class="flex gap-5 text-gray-700 flex-wrap">
           <li>File</li> 
           <li>Edit</li> 
           <li>View</li> 
           <li>Insert</li> 
           <li>Format</li> 
           <li>Tools</li> 
           <li>Extensions</li> 
           <li>Help</li> 
        </ul>

    </section>
</template>

<script>
import { DocumentTextIcon } from '@heroicons/vue/24/solid/index'

export default {
    props: {
        name: {
            Type: String,
            default: 'Freshly Brewed Document'
        }
    }
}
</script>