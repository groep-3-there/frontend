<template>
    <v-chip
        variant="flat"
        :color="color"
        text-color="white"
        class="ma-2"
    >
        <slot></slot>
    </v-chip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

enum Type {
    Idea = "idea",
    Feedback = "feedback",
    Question = "question",
    default = "default"
}

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: "default"
    }
})

const color = ref("");

switch (props.type) {
    case Type.Idea:
        color.value = "mmyellow"
        break;
    case Type.Feedback:
        color.value = "primary"
        break;
    case Type.Question:
        color.value = "primary"
        break;
    default:
        color.value = "primary"
        break;
}
</script>
