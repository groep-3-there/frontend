<template>
    <v-row>
        <v-col class="d-flex align-center mt-5">
            <h2>
                Favoriete challenges van {{ sessionStore.loggedInUser?.name }}
            </h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <p>
                Als we nog favoriete challenges hebben, dan komen ze hier te
                staan.
            </p>
            <p>Component: ChallengeFavoritesList.vue</p>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";

const sessionStore = useSessionStore();
</script>
