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
                <h1 class="white-text challenge-title">Bedrijfsaanvragen</h1>
            </v-col>
        </v-row>
        <template
            v-for="companyRequest in requests?.content"
            :key="companyRequest.id"
        >
            <v-row>
                <v-col cols="12" md="9" class="mx-auto">
                    <CompanyRequest
                        :companyRequest="companyRequest"
                        @requestUpdateRequests="loadRequests"
                        class="border"
                    ></CompanyRequest>
                </v-col>
            </v-row>
        </template>
        <v-row>
            <v-col cols="12" md="9" class="mx-auto">
                <v-pagination
                    v-if="requests"
                    v-model="page"
                    :length="requests.totalPages"
                    @input="loadRequests"
                    :totalVisible="7"
                ></v-pagination>
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

.border {
    border: 1px solid black;
    border-radius: 10px;
}

.padding-around {
    padding: 10px;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import CompanyRequest from "@/components/CompanyRequest.vue";
import { CompanyRequests } from "@/models/CompanyRequests.js";
import { CompanyRequestsResults } from "@/models/CompanyRequestsResults";
import { onMounted } from "vue";
import { Ref, ref } from "vue";
import { useSessionStore } from "@/store/sessionStore";

const sessionStore = useSessionStore();
const requests = ref<CompanyRequestsResults>();

onMounted(async () => {
    await loadRequests();
});

async function loadRequests() {
    console.log("loading requests");
    requests.value = await API.getCompanyRequests();
}
function banner() {
    return `background-image: url(${sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()});`;
}

const page = ref(1);
</script>
