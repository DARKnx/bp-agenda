import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/signIn';

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

export default router;
