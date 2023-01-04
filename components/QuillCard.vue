<template>
    <section class="px-5"> 
        <article class="shadow-lg bg-stone-100 quill-container min-h-[500px]" style="border:0"/>
    </section>
</template>

<script>
import Quill from 'quill'
export default {
    setup() {
        
    },
    props:{
        information: {
            Type:Object,
            default: () => {}
        },
    },
    mounted(){

        const editor = new Quill('article', {
                modules: {
                toolbar: false
            },
        })
        editor.enable(false)
        editor.setContents(JSON.parse(this.information).oldDelta)
        editor.updateContents(JSON.parse(this.information).delta)
    }
}
</script>