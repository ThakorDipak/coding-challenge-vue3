import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/components/Home.vue';
import VerifyRegister from '@/components/VerifyRegister.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { layout: 'empty' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { layout: 'empty' }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { layout: 'empty' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/email-verify/:token',
      name: 'VerifyRegister',
      component: VerifyRegister,
      meta: { layout: 'empty' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
