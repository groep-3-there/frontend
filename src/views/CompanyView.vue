<template>
    <template v-if="!company || !departments"> Loading... </template>
    <template v-if="company && departments">
        <v-row
            class="challenge-hero"
            :style="banner()"
            no-gutters
            justify="center"
            align="center"
        >
            <v-col cols="6" md="3" class="d-flex justify-center">
                <img
                    :src="company.getProfileOrDefaultImageUrl()"
                    class="company-logo"
                />
            </v-col>
            <v-col
                cols="10"
                md="8"
                class="d-flex hero-title flex-column flex-wrap justify-center align-start hero-text"
            >
                <v-col>
                    <h4 class="text-white">Bedrijfsprofiel</h4>
                    <h1 class="text-white challenge-title">
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
                <div class="d-flex flex-wrap justify-center mt-8">
                    <h1 class="italic-title">Challenges</h1>
                </div>
                <div class="text-right mr-12">
                    <p>
                        <span
                            v-for="department in departments"
                            :key="department.id"
                            class="department-filter-option"
                            @click="departmentNameFilter = department.name"
                            :class="{
                                'text-primary':
                                    department.name == departmentNameFilter,
                                'text-coolgray':
                                    department.name != departmentNameFilter,
                            }"
                            >{{ department.name }}</span
                        >
                        &nbsp;
                        <span
                            class="department-filter-option"
                            @click="departmentNameFilter = 'Alles'"
                            :class="{
                                'text-primary': 'Alles' == departmentNameFilter,
                                'text-coolgray':
                                    'Alles' != departmentNameFilter,
                            }"
                            >Alles</span
                        >
                    </p>
                </div>
                <v-spacer class="mb-4"></v-spacer>
            </v-col>
        </v-row>
        <v-row class="challenge-hero d-flex justify-center">
            <template
                v-for="challenge in filteredChallenges"
                :key="challenge.id"
            >
                <ChallengeCard :challenge="challenge" :company="company" />
            </template>
            <template v-if="filteredChallenges.length == 0">
                <div class="d-flex flex-wrap justify-center">
                    <p class="italic-title">Geen challenges gevonden</p>
                </div>
            </template>
        </v-row>
        <v-row>
            <v-col cols="15" md="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    <h1 class="italic-title">Afdelingen</h1>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <p
                class="mx-auto"
                v-for="department in departments"
                :key="department.id"
            >
                {{ department.name }} ·
            </p>
        </v-row>
        <v-spacer class="mb-12"></v-spacer>
    </template>
</template>

<style>
.department-filter-option {
    cursor: pointer;
    transition: color 0.2s;
}

.italic-title {
    font-style: italic;
    font-weight: 400;
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

const filteredChallenges = computed(() => {
    if (!challenges.value) return [];
    if (departmentNameFilter.value == "Alles") return challenges.value;
    return challenges.value.filter(
        (challenge) => challenge.department.name == departmentNameFilter.value,
    );
});
const departmentNameFilter = ref("Alles");

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
