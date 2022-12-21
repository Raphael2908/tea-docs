<template>
  <section class="flex flex-col gap-5 items-center">
    <!-- <div class="w-full rounded-md" id="toolbar"/> -->

    <article class="min-h-screen shadow-lg  w-1/2" id="editor" style="border:0"/>
  </section>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      editor: null,
    }
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
    this.editor = new Quill('#editor', {
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
      console.log('The contents of the editor have changed!')
      this.$socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
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
