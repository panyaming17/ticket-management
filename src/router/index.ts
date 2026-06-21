import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const hasRole = localStorage.getItem('userRole')

  if (to.path !== '/login' && !hasRole) {
    return '/login'
  }
  if (to.path === '/login' && hasRole) {
    return '/'
  }
})

export default router
