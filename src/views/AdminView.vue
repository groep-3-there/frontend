<template>
    <template v-if="!sessionStore.loggedInUser">
        U bent niet ingelogd
    </template>
    <template v-else>
        <v-row
            class="hero"
            :style="banner()"
            no-gutters
            justify="center"
            align="center"
        >
            <v-col cols="6" md="3" class="d-flex justify-center">
                <img
                    :src="
                        sessionStore.loggedInUser?.department?.parentCompany?.getProfileOrDefaultImageUrl()
                    "
                    class="hero-logo"
                />
            </v-col>
            <v-col
                cols="10 "
                md="8"
                class="d-flex hero-title flex-column justify-center align-start hero-text ml-4"
            >
                <h3 class="white-text">Admin paneel</h3>
                <h1 class="white-text challenge-title">Dashboard</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9" md="6" class="d-flex justify-center">
                <v-btn
                    color="primary"
                    class="admin-action"
                    @click="$router.push('/admin/grade-companies')"
                    ><h2>Bedrijfsaanvragen</h2></v-btn
                >
            </v-col>
            <v-col cols="9" md="6" class="d-flex justify-center">
                <v-btn
                    color="primary"
                    class="admin-action"
                    @click="$router.push('/admin')"
                    ><h2>Bedrijfsaanvragen</h2></v-btn
                >
            </v-col>
        </v-row>
    </template>
</template>

<style>
.admin-action {
    width: 80%;
    min-height: 100px;
}
.challenge-title {
    font-size: 4rem;
    font-weight: 1000;
}

.white-text {
    color: white;
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
