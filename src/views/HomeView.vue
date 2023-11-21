<template>
    <div v-if="!sessionStore.loggedInUser">
        <h1>Hallo</h1>
    </div>
    <div v-else-if="sessionStore.loggedInUser">
        <Homepage/>
    </div>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import Homepage from "@/components/Homepage.vue";

const sessionStore = useSessionStore();
</script>

<style scoped></style>
