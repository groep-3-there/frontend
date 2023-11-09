<template>
  <div v-if="editor">
    <div class="options d-flex">
      <div
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'text-option': true, 'is-active': editor.isActive('bold') }"
      >
        <v-icon>mdi-format-bold</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'text-option': true, 'is-active': editor.isActive('italic') }"
      >
        <v-icon>mdi-format-italic</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'text-option': true, 'is-active': editor.isActive('strike') }"
      >
        <v-icon>mdi-format-strikethrough</v-icon>
      </div>
      <div 
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :class="{ 'text-option': true, 'is-active': editor.isActive('underline') }"
      >
        <v-icon>mdi-format-underline</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('heading', { level: 1 }),
        }"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('heading', { level: 2 }),
        }"
      >
        <v-icon>mdi-format-header-2</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('heading', { level: 3 }),
        }"
      >
        <v-icon>mdi-format-header-3</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('bulletList'),
        }"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('orderedList'),
        }"
      >
        <v-icon>mdi-format-list-numbered</v-icon>
      </div>
      <div
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{
          'text-option': true,
          'is-active': editor.isActive('codeBlock'),
        }"
      >
        <v-icon>mdi-code-tags</v-icon>
      </div>
      <div
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        :class="{ 'text-option': true }"
      >
        <v-icon>mdi-undo</v-icon>
      </div>
      <div
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        :class="{ 'text-option': true }"
      >
        <v-icon>mdi-redo</v-icon>
      </div>
    </div>

    <div class="edit-box">
      <editor-content class="editing" :editor="editor" />
    </div>

  </div>
</template>
<style>
.text-option {
  /* border: 1px solid rgb(158, 158, 158); */
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-active{
  background-color: rgb(206, 206, 206);
}
.options {
  background-color: rgb(241, 241, 241);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.options-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-weight: 500;
}

.edit-box {
  border: 1px solid gray;
  border-radius: 5px;
  height: 300px;
}
.editing {
  height: 100%;
}
.editing > * {
  height: 100%;
  padding: 10px;

}
*{
  padding: revert-layer;
}

</style>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { computed } from "vue";

const emit = defineEmits(["modelValueChanged"]);




const editor = useEditor({
  content: `Beschrijving..`,
  onFocus: () => {
    if (editor.value?.getHTML() == `<p>Beschrijving..</p>`) {
      editor.value?.commands.setContent("");
      
    }
  },
  onUpdate: ({ editor }) => {
    emit("modelValueChanged", editor.getHTML());
  },
  extensions: [StarterKit,Underline],
});



</script>
