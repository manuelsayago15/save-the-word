import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/',
  //   redirect: 'login',
  // },
  {
    path: '*',
    redirect: '/',
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('../views/Home.vue')
  // },
  {
    path: '/levels',
    name: 'Levels',
    component: () => import('../views/Levels.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/levels/1/1',
    name: 'Level1-1',
    component: () => import('../views/Level1-1.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/levels/1/2',
    name: 'Level1-2',
    component: () => import('../views/Level1-2.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/levels/2/1',
    name: 'Level2-1',
    component: () => import('../views/Level2-1.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/levels/2/2',
    name: 'Level2-2',
    component: () => import('../views/Level2-2.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/my-list',
    name: 'MyList',
    component: () => import('@/views/MyList.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {protectedRoute: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(store.getters.loggedUser);
  if(to.meta.protectedRoute){
    if(store.state.user !== null || store.state.user !== ''){
      console.log("I'm in");
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
