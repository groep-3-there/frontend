<template>
    <div v-if="editor">
        <div
            :class="{
                'red-border': showError && required,
                'bg-menugray': true,
            }"
            class="options d-flex flex-wrap"
        >
            <div
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('bold'),
                }"
            >
                <v-tooltip text="Vet" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-bold</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('italic'),
                }"
            >
                <v-tooltip text="Cursief" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-italic</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('strike'),
                }"
            >
                <v-tooltip text="Doorstrepen" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-strikethrough</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleUnderline().run()"
                :disabled="
                    !editor.can().chain().focus().toggleUnderline().run()
                "
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('underline'),
                }"
            >
                <v-tooltip text="Onderstrepen" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-underline</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('heading', { level: 1 }),
                }"
            >
                <v-tooltip text="Kop 1" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-header-1</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('heading', { level: 2 }),
                }"
            >
                <v-tooltip text="Kop 2" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-header-2</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('heading', { level: 3 }),
                }"
            >
                <v-tooltip text="Kop 3" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-header-3</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('bulletList'),
                }"
            >
                <v-tooltip text="Lijst" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-list-bulleted</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('orderedList'),
                }"
            >
                <v-tooltip text="Genummerde lijst" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-format-list-numbered</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{
                    'text-option': true,
                    'is-active': editor.isActive('codeBlock'),
                }"
            >
                <v-tooltip text="Codeblok" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-code-tags</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().chain().focus().undo().run()"
                :class="{ 'text-option': true }"
            >
                <v-tooltip text="Ongedaan maken" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-undo</v-icon>
                    </template>
                </v-tooltip>
            </div>
            <div
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().chain().focus().redo().run()"
                :class="{ 'text-option': true }"
            >
                <v-tooltip text="Herhalen" :location="'top'">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-redo</v-icon>
                    </template>
                </v-tooltip>
            </div>
        </div>

        <div
            :class="{
                'edit-box': true,
                'red-border': showError && required,
                'gray-text': placeholderShowing,
            }"
        >
            <editor-content class="editing" :editor="editor" />
        </div>
    </div>
    <div class="v-input__details" v-if="required && showError">
        <div class="error-msg">Dit veld is verplicht!</div>
    </div>
</template>
<style>
.gray-text {
    color: rgb(146, 146, 146) !important;
}

.red-border {
    border-color: red !important;
}

.error-msg {
    color: rgb(var(--v-theme-error)) !important;
    opacity: 1 !important;
    padding-inline-start: 16px;
    padding-inline-end: 16px;
}

.text-option {
    /* border: 1px solid rgb(158, 158, 158); */
    min-width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.is-active {
    background-color: rgb(206, 206, 206);
}

.options {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    width: 100%;
}

.options-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    font-weight: 500;
}

.edit-box {
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    min-height: 200px;
}

.editing {
    height: 100%;
    min-height: 200px;
    border: none;
}

.editing > * {
    min-height: 200px;
    padding: 10px;
}

.editing > *:focus-visible {
    height: 100%;
    padding: 10px;
    outline: none;
}

* {
    padding: revert-layer;
}
</style>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { computed, ref } from "vue";

const emit = defineEmits(["modelValueChanged"]);
const props = defineProps({
    placeholder: {
        type: String,
        default: "<p>Beschrijving..</p>",
    },
    initializeWith: {
        type: String,
        default: null,
        required: false,
    },
    required: {
        type: Boolean,
        default: true,
        required: false,
    },
});
const showError = ref(false);
const editor = useEditor({
    content: props.initializeWith ? props.initializeWith : props.placeholder,
    onFocus: () => {
        if (editor.value?.getHTML() == `<p>${props.placeholder}</p>`) {
            editor.value?.commands.setContent("");
            showError.value = true;
        }
    },
    onUpdate: ({ editor }) => {
        if (editor.getText().length < 1) {
            showError.value = true;
        } else {
            showError.value = false;
        }
        emit("modelValueChanged", editor.getHTML());
    },
    extensions: [StarterKit, Underline],
});

const placeholderShowing = computed(() => {
    return editor.value?.getHTML() == `<p>${props.placeholder}</p>`;
});
</script>
