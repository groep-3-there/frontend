<template>
    <v-row
        class="hero"
        :style="bannerStyling"
        no-gutters
        justify="center"
        align="center"
    >
        <v-col cols="6" md="3" class="d-flex justify-center" @click="$router.push(logoClickSrc)">
            <img v-if="logoSrc" :src="logoSrc" alt="logo" class="hero-logo" :class="{'logo-hover':logoClickSrc !== ''}" />
        </v-col>
        <v-col
            cols="10 "
            md="8"
            class="d-flex hero-text flex-column justify-center align-start hero-text ml-4"
        >
            <h3 class="white-text">{{ subtitle }}</h3>
            <h1 class="white-text hero-title">{{ title }}</h1>
        </v-col>
    </v-row>
</template>
<style scoped>
.logo-hover:hover{
    cursor: pointer;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.386);
}
.hero {
    background-size: cover;
    background-position: 0;
    min-height: 400px;
    max-height: fit-content;
}
.hero-title {
    font-size: 4rem;
    font-weight: 1000;
}
@media screen and (max-width: 1000px) {
    .hero-title {
        font-size: 2.5rem;
    }
}

.white-text {
    color: white;
}
.hero-logo {
    width: min(40%, 25vw);

    border-radius: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}
</style>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    bannerSrc: String,
    logoSrc: String,
    title: String,
    subtitle: String,
    darken: {
        type: Boolean,
        default: false,
    },
    logoClickSrc: {
        type: String,
        default: '',
    },
});

const bannerStyling = computed(() => {
    if (props.darken) {
        return {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("${props.bannerSrc}")`,
        };
    }
    return {
        backgroundImage: `url(${props.bannerSrc})`,
    };
});
</script>
