<template>
    <div class="hor-nav hor-nav-left">
        <v-icon @click="scroll(-2)">mdi-chevron-left</v-icon>
    </div>
    <div class="hor-nav hor-nav-right">
        <v-icon @click="scroll(2)">mdi-chevron-right</v-icon>
    </div>
    <div class="horizontal-scroll-content" ref="horizontalScroll">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const targetItem = ref(0);
const horizontalScroll = ref<HTMLElement | null>(null);

const props = defineProps({
    disableMouseWheel: {
        type: Boolean,
        default: false,
    },
    hideScrollbar: {
        type: Boolean,
        default: false,
    },
});

function scroll(direction: number) {
    targetItem.value += direction;
    targetItem.value = Math.max(0, targetItem.value);
    targetItem.value = Math.min(
        targetItem.value,
        (horizontalScroll.value?.children.length || 1) - 1,
    );
    console.log(targetItem.value);
    horizontalScroll.value?.children[targetItem.value].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
    });
}
const scrollbarCSS = computed(() => {
    return props.hideScrollbar ? "none" : "auto";
});
onMounted(() => {
    horizontalScroll.value?.addEventListener("wheel", (e) => {
        if(props.disableMouseWheel) return;
        e.preventDefault();
        if (e.deltaY > 0) scroll(1);
        else scroll(-1);
    });
});
</script>
<style>
.hor-nav {
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
}
.horizontal-scroll-content::-webkit-scrollbar {
    display: v-bind(scrollbarCSS);
}
</style>
