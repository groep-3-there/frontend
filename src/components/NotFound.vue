<template>
    <v-row class="hero" no-gutters justify="center" align="center">
        <v-col
            cols="12"
            md="12"
            class="d-flex hero-title flex-column justify-center align-start hero-text ml-4"
        >
            <h3 class="text mx-auto">Error</h3>
            <h1 class="text challenge-title mx-auto"><slot></slot></h1>
        </v-col>
    </v-row>
</template>

<style>
.challenge-title {
    font-size: 4rem;
    font-weight: 1000;
}

.text {
    font-weight: 400;
    /* color: rgb(0, 0, 0); */
}

.hero {
    background-size: cover;
    background-position: 0;
    min-height: 400px;
    max-height: fit-content;
}

.hero-logo {
    max-width: min(80%, 25vw);
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}

.attachment-image {
    max-height: 200px;
    max-width: 100%;
}

@media screen and (max-width: 1000px) {
    .challenge-title {
        font-size: 2.5rem;
    }
}
</style>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";

const sessionStore = useSessionStore();

function banner() {
    return `background-image: url(${sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()});`;
}
</script>
