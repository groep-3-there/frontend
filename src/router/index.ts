import { Company } from './../models/Company';
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
        props: (route: { query: { query: any; company_id: any; branches: any; sort: any; }; }) => ({
          query: route.query.query,
          company_id: route.query.company_id,
          branch: route.query.branches,
          sort: route.query.sort,
        })
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
