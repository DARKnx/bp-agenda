import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../pages/signIn')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/signUp')
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
