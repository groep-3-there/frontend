<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <h1>Hallo {{ sessionStore.loggedInUser?.name }}</h1>
            </v-col>
        </v-row>
        <NewestChallenges
        :company="sessionStore.loggedInUser?.department?.parentCompany"
        ></NewestChallenges>
    </v-container>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/store/sessionStore";
import NewestChallenges from "./NewestChallenges.vue";

const sessionStore = useSessionStore();
</script>

<style scoped>

</style>