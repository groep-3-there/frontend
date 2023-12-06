<template>
    <template v-if="!company || !departments"> Loading... </template>
    <template v-if="company && departments">
        <Banner
            :logo-src="company.getProfileOrDefaultImageUrl()"
            :title="company.name"
            :subtitle="'Bedrijfsprofiel'"
            :banner-src="company.getBannerForCompany()"
        />
        <v-row>
            <v-col md="3" class="d-flex align-center justify-center">
                <SmallCountryFlag :country="company.country" class="mr-2" />
                <p>
                    {{ company.country.name }}

                </p>
            </v-col>
            <v-col cols="12" md="6" class="">
                <div class="d-flex flex-wrap justify-center">
                    <Tag type="branch">
                        {{ company.branch.name }}
                    </Tag>
                    <template v-if="company.tags">
                    <Tag v-for="tag in company.tags.split(',')" :key="tag">{{
                        tag
                    }}</Tag>

                    </template>
                </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex justify-center align-center">
                <v-menu
                    v-if="
                        sessionStore.loggedInUser?.department?.parentCompany
                            .id == company.id &&
                        sessionStore.loggedInUser?.hasPermissionAtDepartment(
                            'COMPANY_MANAGE',
                            sessionStore.loggedInUser?.department?.id,
                        )
                    "
                >
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" size="48"
                            >mdi-dots-horizontal</v-icon
                        >
                    </template>
                    <v-list>
                        <v-list-item
                            :value="1"
                            :key="1"
                            @click="
                                $router.push(`/company/${company?.id}/edit`)
                            "
                        >
                            <v-list-item-title
                                ><v-icon class="mr-1" size="24"
                                    >mdi-pencil</v-icon
                                >Bewerken</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            
            

            <v-col cols="12" class="">
                <div class="d-flex flex-wrap justify-center" v-html="company.info">
                    
                </div>
            </v-col>

            <v-divider class="mt-4"></v-divider>
        </v-row>
        <v-row>
            <v-col cols="12" class="">
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
                    <p class="title">Geen challenges gevonden</p>
                </div>
            </template>
        </v-row>

        <v-row class="d-flex justify-center flex-wrap user-bubbles mx-auto">
            <UserBubble
                v-for="user in members"
                :with-name="false"
                :user="user"
                :key="user.id"
            />
        </v-row>
        <v-divider class="my-8"></v-divider>
        <v-row>
            <v-col cols="12" class="">
                <div class="d-flex flex-wrap justify-center">
                    <h2 class="title">Afdelingen</h2>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <p class="mx-auto">
                <span v-for="department in departments" :key="department.id">
                    {{ department.name }}
                </span>
            </p>
        </v-row>

        <v-spacer class="mt-7"></v-spacer>
        <pre></pre>
        <v-row
            v-if="
                sessionStore.loggedInUser?.department?.parentCompany.id ==
                    company.id &&
                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                    'DEPARTMENT_CREATE',
                    sessionStore.loggedInUser.department?.id,
                )
            "
        >
            <DepartmentAddPopup
                v-if="showAddDepartmentPopup"
                @requestUpdateDepartments="getDepartmentsForCompany"
                @on-close="showAddDepartmentPopup = false"
            >
            </DepartmentAddPopup>
            <v-btn
                class="mx-auto"
                color="primary"
                prepend-icon="mdi-plus"
                @click="showAddDepartmentPopup = true"
                >Afdeling toevoegen</v-btn
            >
        </v-row>
        <v-spacer class="mb-12"></v-spacer>

        <v-row>
            <v-col cols="12" class="">
                <div
                    class="d-flex flex-wrap justify-center mb-8"
                    v-if="
                        sessionStore.loggedInUser?.department?.parentCompany
                            .id == company.id
                    "
                >
                    <h2 class="title">
                        Uw afdeling :
                        {{ sessionStore.loggedInUser?.department?.name }}
                    </h2>
                </div>
                <v-row>
                    <v-btn
                        v-if="
                            !inviteCode &&
                            sessionStore.loggedInUser?.department?.parentCompany
                                .id == company.id &&
                            sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                'DEPARTMENT_MANAGE',
                                sessionStore.loggedInUser.department?.id,
                            )
                        "
                        class="mx-auto my-4"
                        color="primary"
                        prepend-icon="mdi-plus"
                        @click="getDepartmentInviteCode"
                        >Uitnodigingscode ophalen</v-btn
                    >
                </v-row>
                <div class="d-flex justify-center" v-if="inviteCode">
                    <div class="invite-box">
                        <p class="text-center">
                            Deel deze link met uw medewerkers, zodat zij bij
                            deze afdeling komen.
                        </p>
                        <div class="code-field">
                            <v-text-field
                                @focus="(e: any) => copyCode()"
                                v-model="inviteLink"
                                :label="
                                    inviteLinkCopied
                                        ? 'Gekopieerd!'
                                        : 'Uitnodigingslink'
                                "
                                :color="
                                    inviteLinkCopied ? 'success' : 'primary'
                                "
                                readonly
                                variant="underlined"
                                class="mx-auto mt-4"
                                prepend-inner-icon="mdi-content-copy"
                            ></v-text-field>
                        </div>
                    </div>
                </div>
                <v-spacer class="mt-8"></v-spacer>

                <v-spacer class="mt-8"></v-spacer>
            </v-col>
        </v-row>
    </template>
</template>

<style>
.user-bubbles {
    max-width: 70%;
}
.invite-box {
    width: 600px;
}
.code-field {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
}
.department-filter-option {
    cursor: pointer;
    transition: color 0.2s;
    margin-left: 10px;
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
import DepartmentAddPopup from "@/components/DepartmentAddPopup.vue";
import UserBubble from "@/components/UserBubble.vue";
import Banner from "@/components/Banner.vue";
import SmallCountryFlag from "@/components/SmallCountryFlag.vue";
const { mobile, lgAndDown, lgAndUp, mdAndDown, lg, name } = useDisplay();

const user = ref() as Ref<User | null>;

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;

const company: Ref<Company | null> = ref(null);
const departments: Ref<Department[] | null> = ref(null);
const challenges: Ref<Challenge[] | null> = ref(null);
const showAddDepartmentPopup = ref(false);

const inviteCode = ref("");
const inviteLink = ref("");
const inviteLinkCopied = ref(false);
const members: Ref<User[]> = ref([]);

const filteredChallenges = computed(() => {
    if (!challenges.value) return [];
    if (departmentNameFilter.value == "Alles") return challenges.value;
    return challenges.value.filter(
        (challenge) => challenge.department.name == departmentNameFilter.value,
    );
});
const departmentNameFilter = ref("Alles");

async function loadCompany() {
    company.value = await API.getCompany(parseInt(id));
}
async function loadUsers() {
    members.value = await API.getCompanyMembersByCompanyId(parseInt(id));
}
async function getDepartmentsForCompany() {
    departments.value = await API.getDepartmentsForCompany(parseInt(id));
}

async function getAllChallengesForCompany() {
    challenges.value = await API.getAllChallengesForCompany(parseInt(id));
}

const sessionStore = useSessionStore();

onMounted(async () => {
    user.value = await API.getCurrentUser();
    await loadCompany();
    await getDepartmentsForCompany();
    await getAllChallengesForCompany();
    await loadUsers();
});
async function getDepartmentInviteCode() {
    const code = await API.getOrGenerateDepartmentCode(parseInt(id));
    inviteCode.value = code.code;
    const cleanUrl = window.location.href.split("/")[2];
    inviteLink.value = `${cleanUrl}?invite=${code.code}`;
}
function copyCode() {
    navigator.clipboard.writeText(inviteLink.value);
    inviteLinkCopied.value = true;
    setTimeout(() => {
        inviteLinkCopied.value = false;
    }, 2500);
}
function banner() {
    return {
        "background-image": `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("${company.value?.getBannerForCompany()}")`,
    };
}

const bigScreen = ref(true);
</script>
