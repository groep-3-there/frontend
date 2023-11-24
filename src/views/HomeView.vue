<template>
    <div v-if="!sessionStore.loggedInUser">
        <LandingPage />
    </div>
    <div v-else-if="sessionStore.loggedInUser">
        <Homepage />
    </div>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
const sessionStore = useSessionStore();
import LandingPage from "@/components/LandingPage.vue";
import Homepage from "@/components/Homepage.vue";

const sessionStore = useSessionStore();
</script>

<style scoped></style>
