<template>
    <div class="wrapper">
        
        <div
            v-for="snack in snackbarStore.snacks"
            @click="snackbarStore.snacks.shift()"
            :key="snack.message"
            :class="['snack-item', getStylingForType(snack.type)]"
        >
            {{ snack.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/store/Snackbar";

const snackbarStore = useSnackbarStore();

function getStylingForType(type: string) {
    switch (type) {
        case "success":
            return "success";
        case "error":
            return "error";
        case "warning":
            return "warning";
        case "info":
            return "info";
        default:
            return "info";
    }
}
</script>
<style scoped>
.info {
    background-color: rgb(26, 145, 145);
}
.error {
    background-color: rgb(244, 92, 92);
}
.success {
    background-color: rgb(67, 219, 67);
}
.warning {
    background-color: rgb(225, 191, 129);
}

.wrapper {
    position: fixed;
    top: 10px;
    right: 50%;
    z-index: 100;
    height: 200px;
    width: 100%;
    max-width: min(500px, 100%);
    transform: translate(50%);
    pointer-events: none;
}

.snack-item {
    position: static;
    height: 75px;
    width: calc(min(500px,100%) - 10px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;;
    pointer-events: all;
}
.snack-item:hover {
    cursor: pointer;
    background-color: rgba(48, 93, 48, 0.8);
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
