<template>
    <v-card>
        <v-app>
            <LoginPopup
                v-if="loginPopup"
                @on-request-register="
                    userRegisterPopup = true;
                    loginPopup = false;
                "
                @on-close="loginPopup = false"
            ></LoginPopup>
            <v-dialog v-model="userRegisterPopup" max-width="50rem">
                <UserRegister
                    v-if="userRegisterPopup"
                    @on-close="userRegisterPopup = false"
                ></UserRegister>
            </v-dialog>
            <!--                 expand on hover, use hover
                                        |            |            show permanent(dont hide on mobile)
                                        \/           \/              \/               width of drawer       Do not make the sidebar scrollable -->
            <v-navigation-drawer
                expand-on-hover
                :rail="mdAndDown"
                :permanent="true"
                :width="drawerWidth"
                style="position: fixed"
            >
                <v-list>
                    <v-list-item
                        v-if="sessionStore.loggedInUser"
                        :prepend-avatar="
                            sessionStore.loggedInUser?.getAvatarOrDefaultUrl()
                        "
                        :title="sessionStore.loggedInUser?.name"
                        :subtitle="sessionStore.loggedInUser?.getSubtitle()"
                    ></v-list-item>
                    <v-list-item
                        v-else
                        :key="1"
                        @click="loginPopup = true"
                        color="primary"
                        prepend-icon="mdi-account-plus"
                        title="Login/Registreer"
                        value="home"
                    >
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item
                        :key="1"
                        @click="$router.push('/')"
                        prepend-icon="mdi-home"
                        title="Home"
                        value="home"
                    ></v-list-item>

                    <v-list-item
                        :key="3"
                        @click="$router.push('/challenge/1')"
                        prepend-icon="mdi-id-card"
                        title="Challenge voorbeeld"
                        value="challenge"
                    ></v-list-item>
                    <v-list-item
                        :key="4"
                        @click="$router.push('/challenges')"
                        prepend-icon="mdi-magnify"
                        title="Zoeken"
                        value="zoeken"
                    ></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    density="compact"
                    nav
                    v-if="sessionStore.loggedInUser?.department"
                >
                    <v-list-subheader>Uw bedrijf</v-list-subheader>

                    <v-list-item
                        @click="
                            $router.push(
                                `/company/${sessionStore.loggedInUser?.department?.parentCompany.id}`,
                            )
                        "
                        :prepend-avatar="
                            sessionStore.loggedInUser?.department?.parentCompany.getProfileOrDefaultImageUrl()
                        "
                        :title="
                            sessionStore.loggedInUser?.department?.parentCompany
                                .name
                        "
                        value="shared"
                    ></v-list-item>
                    <v-list-item
                        v-if="
                            sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                'CHALLENGE_MANAGE',
                                sessionStore.loggedInUser?.department?.id,
                            )
                        "
                        :key="5"
                        @click="$router.push('/create-challenge')"
                        prepend-icon="mdi-plus-box-outline"
                        title="Challenge maken"
                        value="create-challenge"
                    ></v-list-item>

                    <v-list-item
                        :key="6"
                        @click="$router.push('/grade-companies')"
                        prepend-icon="mdi-folder"
                        title="Bedrijfsaanvragen"
                        value="request"
                    >
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    density="compact"
                    nav
                    v-if="sessionStore.loggedInUser?.department"
                >
                    <p>
                        {{
                            sessionStore.loggedInUser.department.parentCompany
                                .name
                        }}
                    </p>
                    <v-list-item
                        @click="
                            $router.push(
                                `/company/${sessionStore.loggedInUser?.department?.parentCompany.id}`,
                            )
                        "
                        :prepend-avatar="
                            sessionStore.loggedInUser?.department?.parentCompany.getProfileOrDefaultImageUrl()
                        "
                        :title="
                            sessionStore.loggedInUser?.department?.parentCompany
                                .name
                        "
                        value="shared"
                    ></v-list-item>
                    <v-list-item
                        v-if="
                            sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                'CHALLENGE_MANAGE',
                                sessionStore.loggedInUser?.department?.id,
                            )
                        "
                        :key="5"
                        @click="$router.push('/create-challenge')"
                        prepend-icon="mdi-plus-box-outline"
                        title="Challenge maken"
                        value="create-challenge"
                    ></v-list-item>
                    <v-list-item
                        :key="7"
                        @click="$router.push('/user-registration')"
                        prepend-icon="mdi-folder"
                        title="Account aanmaken"
                        value="Account aanmaken"
                    ></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="compact" nav v-if="sessionStore.loggedInUser">
                    <v-list-item
                        @click="logOut()"
                        prepend-icon="mdi-account-multiple"
                        title="Log uit"
                        value="shared"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main :class="{ sideBarSpacing: lgAndUp }">
                <router-view></router-view>
            </v-main>
        </v-app>
    </v-card>
</template>
<style scoped>
.sideBarSpacing {
    margin-left: v-bind(widthPx);
    margin-right: v-bind(widthPx);
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import LoginPopup from "@/components/LoginPopup.vue";
import UserRegister from "@/components/UserRegister.vue";
import router from "@/router";
import { watch } from "vue";
import { User } from "@/models/User";
import { onMounted } from "vue";
import API from "@/Api";
import { useSessionStore } from "@/store/sessionStore";
const { mobile, lgAndDown, lgAndUp, mdAndDown, lg, name } = useDisplay();
const sessionStore = useSessionStore();
const loginPopup = ref(false);
const userRegisterPopup = ref(false);

onMounted(async () => {
    // user.value = await sessionStore.forceUpdate()
});

//Drawer size
const drawerWidth = ref(256);
const widthPx = computed(() => {
    return `${drawerWidth.value / 2}px`;
});

function logOut() {
    sessionStore.logOut();
}
</script>
