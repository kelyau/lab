import Vue from 'vue';
import Router from 'vue-router';
import auth from '../service/auth';

Vue.use(Router);
/* eslint-disable */ 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: require('@/components/Hello'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: require('@/pages/signup'),
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/login'),
    },
    {
      path: '/book',
      redirect: '/book/0',
    },
    {
      path: '/book/:id',
      name: 'book',
      component: require('@/pages/book'),
    },
    {
      path: '/note',
      name: 'note',
      component: require('@/pages/note'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!auth.loggedIn()){
    if (to.name === 'login' || to.name === 'signup'){
      next()
    }else{
      next('/login');
    }
    
  }else{
    next();
  }
  
});

export default router

