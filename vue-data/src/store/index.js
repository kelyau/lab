import Vue from 'vue';
import Vuex from 'vuex';
import book from './modules/book';
import user from './modules/user';
import note from './modules/note';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
Vue.config.debug = debug;

export default new Vuex.Store({
  modules: {
    book,
    user,
    note,
  },
  strict: debug,
});
