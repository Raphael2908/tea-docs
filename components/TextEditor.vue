<template>
  <section class="flex flex-col gap-5 items-center">
    <!-- <div class="w-full rounded-md" id="toolbar"/> -->

    <article class="shadow-lg w-1/2 bg-stone-100 quill-container" style="border:0"/>

  </section>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  setup(){
    
  },
  data() {
    return {
      editor: null,
      information: null
    }
  },

  async created(){
    const { data } = await useFetch(`/api/documents/retrieve`, {
      method: 'GET',
      query: {id: this.$route.params.id}
    })  
    this.information = data
  },

  mounted() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    this.editor = new Quill('.quill-container', {
        modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Get a cup of tea...',
      theme: 'snow'
    })
    
    const toolbar = this.editor.getModule('toolbar')
    const toolbarElement = toolbar.container
    toolbarElement.classList.add('custom-toolbar')

  
    this.editor.on('text-change', (delta, oldDelta, source) => {
      if(source !== 'user'){
        return 
      }
      this.$socket.timeout(5000).emit("text editor inputs from client", {delta: delta, oldDelta:oldDelta, id:this.$route.params.id});
    })
  },
  watch:{
    information(value, oldValue){
      if(value != null){
        // const composed = Quill.Delta.compose(JSON.parse(value[0].information).oldDelta, JSON.parse(value[0].information).delta)
        this.editor.setContents(JSON.parse(value[0].information).oldDelta)
      }
    }
  }
}
</script>

<style>
.custom-toolbar {
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
