<template>
    <template v-if="!company"> Loading... </template>
    <template v-if="company">
        <v-row
            class="challenge-hero"
            :style="banner()"
            no-gutters
            justify="center"
            align="center"
        >
            <v-col
                cols="1"
                md="5"
                class="d-flex flex-column justify-center align-center hero-text"
            >
                <img
                    :src="company.getProfileOrDefaultImageUrl()"
                    class="company-logo rounded-circle"
                />
            </v-col>
            <v-col
                cols="2"
                md="5"
                class="d-flex hero-title flex-column flex-wrap justify-center align-start hero-text"
            >
                <v-col>
                    <h4 class="text-white">Bedrijfsprofiel</h4>
                    <h1 class="text-white">
                        {{ company.name }}
                    </h1>
                </v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="15" md="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    <Tag type="branch">
                        {{ company.branch.name }}
                    </Tag>
                    <Tag v-for="tag in company.tags.split(',')" :key="tag">{{
                        tag
                    }}</Tag>
                </div>
            </v-col>

            <v-col cols="15" md="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    {{ company.info }}
                </div>
            </v-col>

            <v-divider class="mt-4"></v-divider>
        </v-row>
        <v-row>
            <v-col cols="15" md="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    <h1 class="italic-title">Challenges</h1>
                </div>
            </v-col>
        </v-row>
        <v-row class="challenge-hero">
            <div v-for="challenge in challenges" :key="challenge.id">
                <ChallengeCard :challenge="challenge" :company="company" />
            </div>
        </v-row>
        <v-row>
            <v-col cols="15" md="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    <h1 class="italic-title">Afdelingen</h1>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <h4 class="mx-auto" v-for="department in departments">
                {{ department.name }} ·
            </h4>
        </v-row>
    </template>
</template>

<style>
.reaction-type-selector {
    max-width: 200px !important;
    width: 200px;
    margin-right: 10px;
    margin-top: auto;
}

.reaction-options {
    display: flex;
    flex-direction: row;
    justify-content: end;
    flex-wrap: wrap;
    align-items: center;
    height: 100px;
}

.reaction-options > v-select {
    max-width: 100px;
}

.new-reaction-input {
    width: 100%;
    min-height: 200px;
    border: 2px solid black;
}

.italic-title {
    font-style: italic;
}

.post-heading {
    font-size: 1.6em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.challenge-title {
    font-size: 4rem;
    font-weight: 1000;
}

.white-text {
    color: white;
}

.challenge-hero {
    background-size: cover;
    background-position: 0;
    min-height: 400px;
    max-height: fit-content;
}

.company-logo {
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

<script setup lang="ts">
import { Ref, computed } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { User } from "@/models/User";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import API from "@/Api";
import { Company } from "@/models/Company";
import Tag from "@/components/Tag.vue";
import { useSessionStore } from "@/store/sessionStore";
import { Department } from "@/models/Department";
import { Challenge } from "@/models/Challenge";
import ChallengeCard from "@/components/ChallengeCard.vue";

const { mobile, lgAndDown, lgAndUp, mdAndDown, lg, name } = useDisplay();

const user = ref() as Ref<User | null>;

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;

const company: Ref<Company | null> = ref(null);
const departments: Ref<Department[] | null> = ref(null);
const challenges: Ref<Challenge[] | null> = ref(null);

async function loadCompany() {
    console.log("Loading company");
    company.value = await API.getCompany(parseInt(id));
}

async function getDepartmentsForCompany() {
    console.log("Loading departments for company");
    departments.value = await API.getDepartmentsForCompany(parseInt(id));
}

async function getAllChallengesForCompany() {
    console.log("Getting all the company challenges");
    challenges.value = await API.getAllChallengesForCompany(parseInt(id));
}

const sessionStore = useSessionStore();

onMounted(async () => {
    user.value = await API.getCurrentUser();
    await loadCompany();
    await getDepartmentsForCompany();
    await getAllChallengesForCompany();
});

function banner() {
    return {
        "background-image": `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("${company.value?.getBannerForCompany()}")`,
    };
}

const bigScreen = ref(true);
</script>
