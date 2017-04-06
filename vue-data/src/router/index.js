import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Book from '@/pages/book';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/book',
      redirect: '/book/0',
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book,
    },
  ],
});
