import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../pages/signIn/index.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/dashboard/index.vue')
    },
    {
      path: '/sucess',
      name: 'sucess',
      component: () => import('../pages/signUp/index.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {

  if (!to.meta.requiresAuth) return next();

    var isAuthenticated;
    
    if (isAuthenticated) {

      next();
    } else {

      next('/signin');
    }

});

export default router;
