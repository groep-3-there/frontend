<template>
    <template v-if="!user">
        <div>
            <v-progress-circular indeterminate></v-progress-circular>
        </div>
    </template>
    <template v-if="user">
        <Banner
            :banner-src="'/banners/banner-1.jpg'"
            :darken="true"
            :logo-src="user?.getAvatarOrDefaultUrl()"
            :title="user?.name"
            :subtitle="'Persoonsprofiel'"
        />
        <v-row>
            <v-col md="3" class="d-flex align-center justify-center">
                <v-icon>mdi-calendar-blank</v-icon>
                {{
                    user.createdAt.toLocaleDateString("nl-nl", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                }}
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-wrap justify-center">
                <template v-if="user.tags">
                    <Tag v-for="tag in user.getTagList()" :key="tag">{{
                        tag
                    }}</Tag>
                </template>
            </v-col>
            <v-col cols="12" md="3" class="d-flex justify-center align-center">
                <v-menu v-if="user.id === sessionStore.loggedInUser?.id">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" size="48" class=""
                            >mdi-dots-horizontal</v-icon
                        >
                    </template>
                    <v-list>
                        <v-list-item
                            :value="1"
                            :key="1"
                            @click="$router.push(`/user/${user?.id}/edit`)"
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
        <v-spacer class="my-12"></v-spacer>

        <v-row no-gutters>
            <v-col cols="10" class="mx-auto user-information">
                <p class="text-center" v-html="user.info"></p>
            </v-col>
        </v-row>

        <v-divider class="my-8"></v-divider>

        <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
                <div>
                    <h2 class="post-heading">Bedrijf</h2>
                    <v-spacer class="my-2"></v-spacer>

                    <div v-if="user.department?.parentCompany" class="company-icon company-hover"
                    @click="$router.push(`/company/${user.department?.parentCompany.id}`)"
                    
                    >
                        <img
                            :src="
                                user.department?.parentCompany.getProfileOrDefaultImageUrl()
                            "
                            class="company-logo"
                        />
                        <p class="ml-5">
                            {{ user.department.name }} |
                            {{ user.department.parentCompany.name }}
                        </p>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div>
                    <h2 class="post-heading">Contact</h2>
                    <v-spacer class="my-2"></v-spacer>
                    <div v-if="user.isEmailPublic">
                        <v-icon size="32"> mdi-email-outline </v-icon>
                        {{ user.email }}
                    </div>
                    <div v-if="user.isPhoneNumberPublic && user.phoneNumber">
                        <v-icon size="32"> mdi-phone </v-icon>
                        {{ user.phoneNumber }}
                    </div>
                </div>
            </v-col>
        </v-row>
    </template>
</template>

<style scoped>
.company-hover:hover{
    cursor: pointer;
    box-shadow: 0 0 4px 2px rgba(67, 67, 67, 0.386);
}
.company-logo {
    width: 72px;
    height: 72px;
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}

.company-icon {
    display: flex;
    border-radius: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    border-color: transparent;
    align-items: center;
}
</style>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import Tag from "@/components/Tag.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import API from "@/Api";
import { useSessionStore } from "@/store/sessionStore";
import { User } from "@/models/User";
import Banner from "@/components/Banner.vue";

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
