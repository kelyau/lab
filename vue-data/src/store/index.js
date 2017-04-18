import Vue from 'vue';
import Vuex from 'vuex';
import book from './modules/book';
import user from './modules/user';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
Vue.config.debug = debug;

export default new Vuex.Store({
  modules: {
    book,
    user,
  },
  strict: debug,
});
