import Vue from 'vue';
import vueResource from 'vue-resource';

Vue.use(vueResource);

const getBookList = (obj) => {
  let query = obj;
  if (!query) {
    query = { tag: 'en' };
  }
  return Vue.http.get('https://api.douban.com/v2/book/search', query);
};

const getBookItem = id => Vue.http.get(`https://api.douban.com/v2/book/${id}`);

export { getBookList, getBookItem };
