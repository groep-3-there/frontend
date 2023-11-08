<template>
  <div v-if="editor">
    <v-btn @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" 
    :class="{ 'is-active': editor.isActive('bold') }"> B
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" 
    :class="{ 'is-active': editor.isActive('italic') }">Scheef
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" 
    :class="{ 'is-active': editor.isActive('strike') }">Doorgestreept
    </v-btn> 
    <v-btn @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{
      'is-active': editor.isActive('heading', { level: 1 })}"> H1
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 
      'is-active': editor.isActive('heading', { level: 2 }) }">H2
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{
      'is-active': editor.isActive('heading', { level: 3 }) }">H3
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleBulletList().run()" :class="{ 
      'is-active': editor.isActive('bulletList') }">Bullet lijst
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 
      'is-active': editor.isActive('orderedList') }">Genummerde lijst
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 
      'is-active': editor.isActive('codeBlock') }">Code blok maken
    </v-btn>
    <v-btn @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 
      'is-active': editor.isActive('blockquote') }">Blokquote
    </v-btn>
    <v-btn @click="editor.chain().focus().undo().run()" 
    :disabled="!editor.can().chain().focus().undo().run()">Ongedaan maken
    </v-btn>
    <v-btn @click="editor.chain().focus().redo().run()" 
    :disabled="!editor.can().chain().focus().redo().run()">Vooruit
    </v-btn>

    <div class="edit-box">
      
      <editor-content :editor="editor" />
    </div>
  </div>
</template>
<style>
.edit-box{  
  border: 1px solid gray;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: `Beschrijving..`,
  extensions: [
    StarterKit,
  ],
})

</script>