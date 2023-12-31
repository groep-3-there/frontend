<template>
    <template v-if="!sessionStore.loggedInUser">
        U bent niet ingelogd
    </template>
    <template v-else>
        <Banner
            :banner-src="'/banners/companytower.jpg'"
            :darken="true"
            :logo-src="
                sessionStore.loggedInUser?.department?.parentCompany?.getProfileOrDefaultImageUrl()
            "
            :title="'Bedrijfsaanvragen'"
            :subtitle="'Admin paneel'"
        />
        <v-col md="9" cols="12" class="mx-auto">
            <p class="text-left">
                <template v-if="requests?.content.length === 0">
                    Er zijn geen bedrijfsaanvragen
                </template>
                <template v-else-if="requests?.totalElements === 1">
                    Er is 1 aanvraag
                </template>
                <template v-else>
                    Er zijn {{ requests?.totalElements }} aanvragen
                </template>
            </p>

        </v-col>
        <v-divider class="my-2"></v-divider>
        <template
            v-for="companyRequest in requests?.content"
            :key="companyRequest.id"
        >
            <v-row>
                <v-col cols="12" md="9" class="mx-auto">
                    <CompanyRequest
                        :companyRequest="companyRequest"
                        @requestUpdateRequests="loadRequests(page)"
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
                    @click="getPage()"
                    :totalVisible="7"
                ></v-pagination>
            </v-col>
        </v-row>
    </template>
</template>

<style scoped>
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
import Banner from "@/components/Banner.vue";
import router from "@/router";

const sessionStore = useSessionStore();
const requests = ref<CompanyRequestsResults>();

/** @type {number} - current page, 1 is default
 * important to subtract 1 when calling the API,
 * because the API starts counting at 0 for pages and Vue starts counting at 1 */
const page = ref(1);

onMounted(async () => {
    await loadRequests(page.value);
});

async function loadRequests(page: number) {
    API.getCompanyRequests(page - 1).then((result) => {
        requests.value = result;
    });
}
function banner() {
    return `background-image: url(${sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()});`;
}

async function getPage() {
    router.push({
        path: "grade-companies",
        query: { page: page.value },
    });

    await loadRequests(page.value);
}
</script>
