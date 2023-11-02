<template>
    <v-chip
        variant="flat"
        :color="color"
        text-color="white"
        class="ma-2"
    >
        {{ props.tagName }}
    </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const color = computed(()=>{
    if(props.isIdea){
        return "mmyellow"
    }
    if(props.isFeedback){
        return "primary"
    }
    if(props.isQuestion){
        return "primary"
    }
    return "primary"

})


const props = defineProps({
    tagName: {
        type: String,
        required: true
    },
    isIdea: {
        type: Boolean,
        required: false,
        default: false
    },
    isFeedback:{
        type: Boolean,
        required: false,
        default: false
    },
    isQuestion:{
        type: Boolean,
        required: false,
        default: false
    }

})

</script>