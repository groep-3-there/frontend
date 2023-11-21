<template>
    <template v-if="!user">
        <div>
            <v-progress-circular indeterminate></v-progress-circular>
        </div>
    </template>
    <template v-if="user">
        <v-row
            class="user-hero"
            no-gutters
            :style="banner()"
            justify="center"
            align="center"
        >
            <v-col cols="6" md="3" class="d-flex justify-center">
                <img
                    :src="user?.getAvatarOrDefaultUrl()"
                    class="company-logo"
                />
            </v-col>
            <v-col
                cols="7"
                md="8"
                class="d-flex hero-title flex-column justify-center align-start hero-text ml-4"
            >
                <h3 class="white-text">Persoonsprofiel</h3>
                <h1 class="white-text">{{ user.name }}</h1>
                <div class="d-flex flex-wrap justify-center">
                    <Tag v-for="tag in user.tags.split(',')" :key="tag">{{
                        tag
                    }}</Tag>
                </div>
            </v-col>
            <v-col>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" size="48" class="white-text"
                            >mdi-dots-horizontal</v-icon
                        >
                    </template>
                    <v-list>
                        <v-list-item
                            :value="1"
                            :key="1"
                            @click="$router.push(`/niks`)"
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

        <v-row no-gutters>
            <v-col cols="10" class="mx-auto">
                <section>
                    <h2 class="post-heading">Informatie</h2>
                    <p>{{ user.info }}</p>
                </section>
            </v-col>
        </v-row>

        <v-divider class="mt-14"></v-divider>

        <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
                <div>
                    <h2 class="post-heading">Bedrijf</h2>
                    <div class="companyicon">
                        <img
                            :src="
                                user.department?.parentCompany.getProfileOrDefaultImageUrl()
                            "
                            class="company-logo"
                        />
                        <p class="ml-5">
                            {{ user.department?.parentCompany.name }}
                        </p>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div>
                    <h2 class="post-heading">Contact</h2>
                    <div v-if="user.isEmailPublic">
                        <v-icon> mdi-email-outline </v-icon>
                        {{ user.email }}
                    </div>
                    <div v-if="user.isPhoneNumberPublic">
                        <v-icon> mdi-phone </v-icon>
                        {{ user.phoneNumber }}
                    </div>
                </div>
            </v-col>
        </v-row>
    </template>
</template>

<style>
.post-heading {
    font-size: 1.6em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.white-text {
    color: white;
}

.user-hero {
    background-size: cover;
    background-position: 0;
    padding-top: 6rem;
    max-height: fit-content;
}

.company-logo {
    max-width: min(80%, 25vw);
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}

.companyicon {
    display: flex;
    align-items: center;
}
</style>

<script lang="ts" setup>
import ConcludeChallengePopup from "@/components/ConcludeChallengePopup.vue";
import AreYouSurePopup from "@/components/AreYouSurePopup.vue";
import RichEditor from "@/components/RichEditor.vue";
import { Ref, computed, ref } from "vue";
import { Challenge } from "@/models/Challenge";
import Tag from "@/components/Tag.vue";
import ChallengeReaction from "@/components/ChallengeReaction.vue";
import ChallengeCreateReaction from "@/components/ChallengeCreateReaction.vue";
import { ChallengeInput } from "@/models/ChallengeInput";

import { useRoute } from "vue-router";
import { onMounted } from "vue";
import API from "@/Api";
import { Image } from "@/models/Image";
import { useSessionStore } from "@/store/sessionStore";
import { User } from "@/models/User";

const sessionStore = useSessionStore();

const idParam = useRoute().params.id;
let id: any = Array.isArray(idParam) ? idParam[0] : idParam;
const user: Ref<User | null> = ref(null);
onMounted(async () => {
    loadUser();
});

async function loadUser() {
    user.value = await API.getUserById(id);
}

function banner() {
    return {
        "background-image": `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("/banners/banner-1.jpg")`,
    };
}
</script>
