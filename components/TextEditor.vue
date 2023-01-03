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
import axios from 'axios'

export default {
  setup(){
    
  },
  data() {
    return {
      delta: null
    }
  },

  async mounted() {
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

    const editor = new Quill('.quill-container', {
        modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Get a cup of tea...',
      theme: 'snow'
    })
    
    const toolbar = editor.getModule('toolbar')
    const toolbarElement = toolbar.container
    toolbarElement.classList.add('custom-toolbar')

    const doc  = await axios.get(`/api/documents/retrieve`, {
      params: { id: this.$route.params.id } 
    })

    editor.setContents(doc.data.oldDelta)
    editor.updateContents(doc.data.delta)

    const channel = this.$base.channel('room1')

    editor.on('text-change', (delta, oldDelta, source) => {
      if(source !== 'user'){ // If not by user do not store in database
        return 
      }
      channel.send({
        type: 'broadcast',
        event: 'text-change',
        payload: {delta: delta, oldDelta: oldDelta, id: this.$route.params.id}
      })
    })

    channel.on('broadcast', {event: 'text-change'}, (payload) => {
      editor.setContents(payload.payload.oldDelta)
      editor.updateContents(payload.payload.delta)
    }).subscribe((status) => {
      if(status === 'SUBSCRIBED'){
      }
    })

    
  },
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
