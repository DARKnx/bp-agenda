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
      path: '/dashboard/schedule',
      name: 'schedule',
      component: () => import('../pages/schedule/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../pages/logout/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/settings',
      name: 'settings',
      component: () => import('../pages/settings/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/profile',
      name: 'profile',
      component: () => import('../pages/profile/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/historic',
      name: 'profile',
      component: () => import('../pages/historic/index.vue'),
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
