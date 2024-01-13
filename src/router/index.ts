import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '../stores/user';
import { getUser } from '../actions/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/login/index.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/dashboard/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../pages/signUp/index.vue'),
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next();
  }
  var user = await getUser();
  if (!user.error) {
    next();
  } else {
    next('/');
  }
});

export default router;
