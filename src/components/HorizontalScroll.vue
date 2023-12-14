<template>
    <div class="wrapper">
        <div class="hor-nav hor-nav-left" v-if="!hideArrows">
            <v-icon :color="isDarkmode ? 'white' : 'black'" @click="scroll(-1000)">mdi-chevron-left</v-icon>
        </div>
        <div class="hor-nav hor-nav-right" v-if="!hideArrows">
            <v-icon :color="isDarkmode ? 'white' : 'black'" @click="scroll(1000)">mdi-chevron-right</v-icon>
        </div>
        <div class="horizontal-scroll-content" ref="horizontalScroll">
            <slot></slot>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDarkmode = computed(()=>{
    return theme.global.name.value === 'dark'
})
const horizontalScroll = ref<HTMLElement | null>(null);

const props = defineProps({
    disableMouseWheel: {
        type: Boolean,
        default: true,
    },
    hideScrollbar: {
        type: Boolean,
        default: false,
    },
    hideArrows:{
        type: Boolean,
        default: false,
        required: false
    }
});


function scroll(direction: number) {
    horizontalScroll.value?.scrollBy({
        left: direction ,
        behavior: "smooth",
    });
}
const scrollbarCSS = computed(() => {
    return props.hideScrollbar ? "none" : "auto";
});
onMounted(() => {
    horizontalScroll.value?.addEventListener("wheel", (e) => {
        if(props.disableMouseWheel) return;
        e.preventDefault();
        scroll(e.deltaY*5);
    });
});
</script>
<style scoped>
.wrapper{
    position: relative;
    max-width: 100%;
}
.hor-nav {
    z-index: 20;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 40px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    cursor: pointer;
}
.hor-nav:hover {
    color: #1976d2;
}
.hor-nav-left {
    left: 0;
}
.hor-nav-right {
    right: 0;
}
.horizontal-scroll-content {
    display: flex;
    overflow-x: scroll;
    padding: 10px;
    min-height: 300px;
}
.horizontal-scroll-content::-webkit-scrollbar {
    display: v-bind(scrollbarCSS);
}
</style>
