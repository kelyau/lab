import Vue from 'vue';
import vueResource from 'vue-resource';

Vue.use(vueResource);

const getBookList = (obj) => {
  let query = obj;
  if (!query) {
    query = { tag: 'en' };
  }
  return Vue.http.jsonp('https://api.douban.com/v2/book/search', { params: query });
};

const getBookItem = obj => Vue.http.jsonp(`https://api.douban.com/v2/book/${obj.id}`);

export { getBookList, getBookItem };
