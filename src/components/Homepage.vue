<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <h1>Hallo {{ sessionStore.loggedInUser?.name }}</h1>
            </v-col>
        </v-row>
        <ListNewestChallenges
            v-if="sessionStore.loggedInUser?.department?.parentCompany"
            :company="sessionStore.loggedInUser?.department?.parentCompany"
        ></ListNewestChallenges>
        <hr class="mt-5" />
        <ListFavoriteChallenges></ListFavoriteChallenges>
    </v-container>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/store/sessionStore";
import ListNewestChallenges from "@/components/ListNewestChallenges.vue";
import ListFavoriteChallenges from "@/components/ListFavoriteChallenges.vue";

const sessionStore = useSessionStore();
</script>

<style scoped>
h1 {
    padding-top: 4rem;
}
</style>
