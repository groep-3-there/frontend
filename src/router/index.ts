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
                path: "create-challenge",
                name: "Create Challenge",
                component: () => import("@/views/CreateChallengeView.vue"),
            },
            {
                path: "edit-challenge/:id",
                name: "Edit Challenge",
                component: () => import("@/views/EditChallengeView.vue"),
            },
            {
                path: "user-registration",
                name: "Account aanmaken",
                component: () => import("@/views/UserRegistrationView.vue"),
            },
            {
                path: "grade-companies",
                name: "Grade Request",
                component: () => import("@/views/CompanyRequestView.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.name as string;
    const sessionStore = useSessionStore();
    sessionStore.forceUpdate();
    next();
});

export default router;
