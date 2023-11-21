<template>
    <v-chip variant="flat" :color="color" text-color="white" class="ma-2">
        <slot></slot>
    </v-chip>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: "default",
    },
});

const color = computed(()=>{
    switch (props.type.toLowerCase()) { 
        case "branch":
            return "primary";
        case "idea":
            return "mmyellow";
        case "feedback":
            return "primary";
            break;
        case "question":
            return "primary";
        default:
            return "darkgreen";
    }

});
</script>
