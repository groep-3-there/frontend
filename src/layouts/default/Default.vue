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
                <UserRegister2
                    v-if="userRegisterPopup"
                    @on-close="userRegisterPopup = false"
                ></UserRegister2>
            </v-dialog>

            <!-- On small screens, the sidebar is hidden, an can be toggled with this button -->
            <div
                class="sidebar-toggle-wrap"
                @click="openSidebar"
                v-if="mdAndDown"
            >
                <v-btn class="sidebar-toggle-btn">
                    <v-icon class="sidebar-toggle-icon" color="primary"
                        >mdi-menu</v-icon
                    >
                </v-btn>
            </div>
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
                        @click="
                            $router.push(
                                '/user/' + sessionStore.loggedInUser.id,
                            )
                        "
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
                        @click="loginPopup = true"
                        color="primary"
                        prepend-icon="mdi-account-plus"
                        title="Login/Registreer"
                        value="home-login"
                    >
                    </v-list-item>
                    <v-list-item
                        v-if="sessionStore.loggedInUser"
                        @click="$router.push('/notifications')"
                        value="notifications"
                    >
                        <v-badge
                            style="display: block; margin: 0"
                            :color="
                                unreadNotifications.length > 0 ? 'red' : 'grey'
                            "
                            :inline="true"
                            size
                            :content="unreadNotifications.length"
                        >
                            <v-icon
                                style="margin-right: 10px; margin-left: -4px"
                                icon="mdi-bell-outline"
                                size="24"
                            ></v-icon>
                            <v-list-item-title
                                style="
                                    justify-content: end;
                                    margin-left: 10px;
                                    margin-right: 10px;
                                    align-items: center;
                                    display: inline-flex;
                                "
                                >Notificaties</v-list-item-title
                            >
                        </v-badge>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item
                        @click="$router.push('/')"
                        prepend-icon="mdi-home"
                        title="Home"
                        value="home-home"
                    ></v-list-item>
                    <v-list-item
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
                        prepend-icon="mdi-briefcase-check-outline"
                        @click="companyRegisterPopup = true"
                        title="Registreer uw bedrijf"
                        value="Registreer uw bedrijf"
                    ></v-list-item>

                    <v-list-item
                        v-if="!sessionStore.loggedInUser.department"
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
                            value="user-header"
                        ></v-list-item>
                        <v-list-item
                            v-if="
                                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                    'CHALLENGE_MANAGE',
                                    sessionStore.loggedInUser?.department?.id,
                                )
                            "
                            @click="$router.push('/challenge/new')"
                            prepend-icon="mdi-plus-box-outline"
                            title="Challenge maken"
                            value="create-challenge"
                        ></v-list-item>
                        <v-list-item
                            v-if="
                                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                    'DEPARTMENT_MANAGE',
                                    sessionStore.loggedInUser?.department?.id,
                                )
                            "
                            @click="
                                $router.push(
                                    `/company/${sessionStore.loggedInUser?.department?.id}/stats-dashboard`,
                                )
                            "
                            prepend-icon="mdi-chart-bar"
                            title="Statistieken"
                            value="statistieken"
                        ></v-list-item>
                        <v-list-item
                            v-if="
                                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                    'COMPANY_GRAPH_READ',
                                    sessionStore.loggedInUser?.department?.id,
                                )
                            "
                            @click="
                                $router.push(
                                    `/settings/${sessionStore.loggedInUser?.department?.id}`,
                                )
                            "
                            prepend-icon="mdi-cog-outline"
                            title="Instellingen"
                            value="settings"
                        ></v-list-item>
                        <template
                            v-if="
                                sessionStore.loggedInUser.role?.isMatchmaker ||
                                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                    'COMPANY_GRADE',
                                    sessionStore.loggedInUser?.department?.id,
                                ) ||
                                sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                    'MATCHMAKER_GRAPH_READ',
                                    sessionStore.loggedInUser?.department?.id,
                                )
                            "
                        >
                            <v-list-subheader>Admin</v-list-subheader>
                            <v-list-item
                                v-if="
                                    sessionStore.loggedInUser?.role
                                        ?.isMatchmaker
                                "
                                @click="$router.push('/admin')"
                                prepend-icon="mdi-security"
                                title="Admin"
                                value="admin"
                            ></v-list-item>
                            <v-list-item
                                v-if="
                                    sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                        'COMPANY_GRADE',
                                        sessionStore.loggedInUser?.department
                                            ?.id,
                                    )
                                "
                                @click="$router.push('/admin/grade-companies')"
                                prepend-icon="mdi-briefcase-check-outline"
                                title="Bedrijfsaanvragen"
                                value="Bedrijfsaanvragen"
                            >
                            </v-list-item>
                            <v-list-item
                                v-if="
                                    sessionStore.loggedInUser?.role
                                        ?.isMatchmaker
                                "
                                @click="$router.push('/admin/roles')"
                                prepend-icon="mdi-account-group"
                                title="Rollen bewerken"
                                value="edit-roles"
                            >
                            </v-list-item>
                            <v-list-item
                                v-if="
                                    sessionStore.loggedInUser?.hasPermissionAtDepartment(
                                        'MATCHMAKER_GRAPH_READ',
                                        sessionStore.loggedInUser?.department
                                            ?.id,
                                    )
                                "
                                @click="$router.push('/admin/stats-dashboard')"
                                prepend-icon="mdi-chart-bar"
                                title="Statistieken"
                                value="Statistieken"
                            >
                            </v-list-item>
                        </template>
                    </template>
                </v-list>
                <v-divider></v-divider>
                <template v-slot:append>
                    <v-list density="compact" nav>
                        <v-switch
                            prepend-icon="mdi-theme-light-dark"
                            v-model="darkMode"
                            label="Donkere modus"
                        ></v-switch>
                        <v-list-item
                            v-if="sessionStore.loggedInUser"
                            @click="logOut()"
                            prepend-icon="mdi-logout"
                            title="Uitloggen"
                            value="shared"
                        ></v-list-item>
                    </v-list>
                </template>
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
import { computed, watch } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import LoginPopup from "@/components/LoginPopup.vue";

import UserRegister2 from "@/components/UserRegister2.vue";

import { onMounted } from "vue";

import CompanyRegistrationPopUp from "@/components/CompanyRegistrationPopUp.vue";
import JoinCompanyPopup from "@/components/JoinCompanyPopup.vue";
import InviteListener from "@/components/InviteListener.vue";
import { useSessionStore } from "@/store/sessionStore";
import router from "@/router";
import { useTheme } from "vuetify";
const theme = useTheme();

const { lgAndUp, mdAndDown } = useDisplay();
const sessionStore = useSessionStore();
const loginPopup = ref(false);
const userRegisterPopup = ref(false);
const sidebarVisibleOnSmallDevice = ref(true);
const companyRegisterPopup = ref(false);
const joinCompanyPopup = ref(false);
const darkMode = ref(false);

onMounted(async () => {
    if (mdAndDown.value) {
        sidebarVisibleOnSmallDevice.value = false;
    }
    darkMode.value = theme.global.name.value == "dark";
});

//Drawer size
const drawerWidth = ref(256);
const widthPx = computed(() => {
    return `${drawerWidth.value / 2}px`;
});

const unreadNotifications = computed(() => {
    if (!sessionStore.loggedInUser) {
        return [];
    }
    return sessionStore.loggedInUser?.notifications?.filter(
        (n) => n.read === false,
    );
});

watch(darkMode, (dark) => {
    theme.global.name.value = dark ? "dark" : "light";
    localStorage.setItem("theme", theme.global.name.value);
});
function openSidebar() {
    sidebarVisibleOnSmallDevice.value = !sidebarVisibleOnSmallDevice.value;
}

function logOut() {
    sessionStore.logOut();
    router.push("/");
}
</script>
