<template>
    <v-card>
        <v-app>
            <InviteListener @request-register="userRegisterPopup = true" />

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

            <!-- On small screens, the sidebar is hidden, an can be toggled with this button -->
            <div class="sidebar-toggle-wrap">
                <v-btn class="sidebar-toggle-btn">
                    <v-icon
                        class="sidebar-toggle-icon"
                        @click="openSidebar"
                        v-if="mdAndDown"
                        color="primary"
                        >mdi-menu</v-icon
                    >
                </v-btn>
            </div>

            <!--                 expand on hover, use hover
                                        |            |            show permanent(dont hide on mobile)
                                        \/           \/              \/               width of drawer       Do not make the sidebar scrollable -->
            <v-navigation-drawer
                v-model="sidebarVisibleOnSmallDevice"
                @update:model-value="sidebarVisibleOnSmallDevice = $event"
                expand-on-hover
                :permanent="false"
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
                    >
                        <p class="user-subtitle">
                            {{ sessionStore.loggedInUser?.getSubtitle() }}
                        </p>
                    </v-list-item>

                    <v-list-item
                        v-else
                        :key="1"
                        @click="loginPopup = true"
                        color="primary"
                        prepend-icon="mdi-account-plus"
                        title="Login/Registreer"
                        value="home-login"
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
                        value="home-home"
                    ></v-list-item>
                    <v-list-item
                        :key="1"
                        @click="$router.push('/debug')"
                        prepend-icon="mdi-bug"
                        title="Debug"
                        value="debug"
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
                <v-list density="compact" nav v-if="sessionStore.loggedInUser">
                    <v-list-subheader>Uw bedrijf</v-list-subheader>
                    <v-list-item
                        v-if="!sessionStore.loggedInUser.department"
                        :key="9"
                        prepend-icon="mdi-briefcase-check-outline"
                        @click="companyRegisterPopup = true"
                        title="Registreer uw bedrijf"
                        value="Registreer uw bedrijf"
                    ></v-list-item>

                    <v-list-item
                        v-if="!sessionStore.loggedInUser.department"
                        :key="9"
                        prepend-icon="mdi-briefcase-check-outline"
                        @click="joinCompanyPopup = true"
                        title="Sluit u aan bij bedrijf"
                        value="Sluit u aan bij bedrijf"
                    ></v-list-item>
                    <JoinCompanyPopup
                        v-if="joinCompanyPopup"
                        @on-close="joinCompanyPopup = false"
                    ></JoinCompanyPopup>
                    <CompanyRegistrationPopUp
                        v-if="companyRegisterPopup"
                        @on-close="companyRegisterPopup = false"
                    >
                    </CompanyRegistrationPopUp>
                    <template v-if="sessionStore.loggedInUser?.department">
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
                                sessionStore.loggedInUser?.department
                                    ?.parentCompany.name
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
                            v-if="sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                'DEPARTMENT_MANAGE',
                                sessionStore.loggedInUser?.department?.id,
                            )"
                            @click="$router.push(`/settings/${sessionStore.loggedInUser?.department?.id}`)"
                            prepend-icon="mdi-cog-outline"
                            title="Instellingen"
                            value="settings"
                        ></v-list-item>
                        <template
                            v-if="sessionStore.loggedInUser.role?.isMatchmaker"
                        >
                            <v-list-subheader>Admin</v-list-subheader>
                            <v-list-item
                                :key="8"
                                @click="$router.push('/admin')"
                                prepend-icon="mdi-security"
                                title="Admin"
                                value="admin"
                            ></v-list-item>
                            <v-list-item
                                :key="8"
                                @click="$router.push('/admin/grade-companies')"
                                prepend-icon="mdi-briefcase-check-outline"
                                title="Bedrijfsaanvragen"
                                value="Bedrijfsaanvragen"
                            >
                            </v-list-item>
                        </template>
                    </template>
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

.sidebar-toggle-btn {
    position: fixed;
    bottom: 2%;
    left: 2%;
    width: 64px !important;
    height: 64px !important;
    z-index: 100;
    border-radius: 100%;
    padding: 0;
    margin: 0;
}

.sidebar-toggle-icon {
    font-size: 2em;
    border-radius: 100%;
    padding: 0;
    margin: 0;
}

.user-subtitle {
    color: rgba(128, 128, 128, 0.75);
    font-size: 0.9em;
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
import CompanyRegistrationPopUp from "@/components/CompanyRegistrationPopUp.vue";
import JoinCompanyPopup from "@/components/JoinCompanyPopup.vue";
import InviteListener from "@/components/InviteListener.vue";
import { useSessionStore } from "@/store/sessionStore";
const { mobile, lgAndDown, lgAndUp, mdAndDown, lg, name } = useDisplay();
const sessionStore = useSessionStore();
const loginPopup = ref(false);
const userRegisterPopup = ref(false);
const sidebarVisibleOnSmallDevice = ref(true);
const companyRegisterPopup = ref(false);
const joinCompanyPopup = ref(false);

onMounted(async () => {
    if (mdAndDown.value) {
        sidebarVisibleOnSmallDevice.value = false;
    }
});

//Drawer size
const drawerWidth = ref(256);
const widthPx = computed(() => {
    return `${drawerWidth.value / 2}px`;
});

function openSidebar() {
    sidebarVisibleOnSmallDevice.value = !sidebarVisibleOnSmallDevice.value;
}

function logOut() {
    sessionStore.logOut();
}
</script>
