<template>
    <section class="mx-auto container py-2 px-4 sm:px-0">
        <!-- Logo -->
        <NuxtLink to="/">
            <h1 class="text-xl">{{ name }}</h1> 
        </NuxtLink>

        <!-- Tools -->
        <ul class="flex text-gray-700 flex-wrap gap-2">
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