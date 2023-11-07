// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
      {
        path: 'vue-tutorial',
        name: 'Vue Tutorial',
        component: () => import('@/views/TutorialView.vue'),
      },
      {
        path: 'challenges',
        name: 'Search Challanges',
        component: () => import('@/views/SearchChallengesView.vue'),
      },
      {
        path: 'challenge/:id',
        name: 'Challenge',
        component: () => import('@/views/ChallengeView.vue'),
      },
      {
      path: 'create-challenge',
        name: 'Create Challenge',
        component: () => import('@/views/CreateChallengeView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
