<template>
    <v-chip variant="flat" :color="color" text-color="white" class="ma-2">
        <slot></slot>
    </v-chip>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: "default",
    },
});

const color = ref("");

switch (props.type.toLowerCase()) { 
    case "branch":
        color.value = "primary";
        break;
    case "idea":
        color.value = "mmyellow";
        break;
    case "feedback":
        color.value = "primary";
        break;
    case "question":
        color.value = "primary";
        break;
    default:
        color.value = "mmtaggreen";
        break;
}
</script>
