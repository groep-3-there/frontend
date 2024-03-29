// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/store/sessionStore";

const routes = [
    {
        path: "/",
        component: () => import("@/layouts/default/Default.vue"),
        children: [
            {
                path: "",
                name: "Home",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ "@/views/HomeView.vue"
                    ),
            },
            {
              path: "Debug",
              name: "Debug",
              component: () => import("@/views/DebugView.vue"),
            },
            {
                path: "challenges",
                name: "Search Challanges",
                component: () => import("@/views/SearchChallengesView.vue"),
            },
            {
                path: "challenge/:id",
                name: "Challenge",
                component: () => import("@/views/ChallengeView.vue"),
            },
            {
                path: "challenge/:id/edit",
                name: "Edit Challenge",
                component: () => import("@/views/EditChallengeView.vue"),
            },
            {
                path: "challenge/new",
                name: "Create Challenge",
                component: () => import("@/views/CreateChallengeView.vue"),
            },
            {
                path: "user/:id",
                name: "Profiel",
                component: () => import("@/views/UserProfileView.vue"),
            },
            {
                path: "user/:id/edit",
                name: "Profiel bewerken",
                component: () => import("@/views/EditUserProfileView.vue"),
            },
            {
                path: "user/:id",
                name: "Profiel",
                component: () => import("@/views/UserProfileView.vue"),
            },
            {
                path: "company/:id",
                name: "Company",
                component: () => import("@/views/CompanyView.vue"),
            },
            {
                path: "company/:id/edit",
                name: "Bedrijf bewerken",
                component: () => import("@/views/EditCompanyProfile.vue"),
            },
            {
                path: "/admin",
                name: "Admin",
                component: () => import("@/views/AdminView.vue"),
            },
            {
                path: "admin/grade-companies",
                name: "Grade Request",
                component: () => import("@/views/CompanyRequestView.vue"),
            },
            {
                path: "admin/roles",
                name: "Roles",
                component: () => import("@/views/RoleEditView.vue"),
            },
            {
                path: "admin/stats-dashboard",
                name: "Admin Stats",
                component: () => import("@/views/AdminStatsView.vue"),
            },
            {
                path: "company/:id/stats-dashboard",
                name: "Company Stats",
                component: () => import("@/views/CompanyStatsView.vue"),
            },
            {
                path: "settings/:id",
                name: "Settings",
                component: () => import("@/views/DepartmentSettingsView.vue"),
            },
            {
                path: "notifications",
                name: "Notifications",
                component: () => import("@/views/NotificationsView.vue"),
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.name as string;
    const sessionStore = useSessionStore();
    sessionStore.forceUpdate();
    next();
});

export default router;
