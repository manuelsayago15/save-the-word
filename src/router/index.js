import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: 'Login',
  },
  {
    path: '*',
    redirect: 'Login',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/level-1.1',
    name: 'Level1-1',
    component: () => import('../views/Level1-1.vue')
  },
  {
    path: '/level-1.2',
    name: 'Level1-2',
    component: () => import('../views/Level1-2.vue')
  },
  {
    path: '/level-2.1',
    name: 'Level2-1',
    component: () => import('../views/Level2-1.vue')
  },
  {
    path: '/level-2.2',
    name: 'Level2-2',
    component: () => import('../views/Level2-2.vue')
  },
  {
    path: '/my-list',
    name: 'MyList',
    component: () => import('@/views/MyList.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
