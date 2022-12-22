<template>    
    <section>
        <Settings class="pb-2"/>
        <ClientOnly fallback-tag="span" fallback="Getting Paper">
            <TextEditor/>
        </ClientOnly>
    </section>
</template>

<script setup>
definePageMeta({
  pageTransition: false
})
</script>