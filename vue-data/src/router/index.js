import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Book from '@/pages/book';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/book',
      name: 'Book',
      component: Book,
    },
  ],
});
