import { getBookList, getBookItem } from '@/service/http';

const types = {
  GET_BOOK_ITEM_SUCCESS: 'GET_BOOK_ITEM_SUCCESS',
  GET_BOOK_LIST_SUCCESS: 'GET_BOOK_LIST_SUCCESS',
  INIT_BOOK_ITEM: 'INIT_BOOK_ITEM',
  DESTROY_BOOK_ITEM: 'DESTROY_BOOK_ITEM',
};

const state = {
  list: [],
  book: {},
};
/* eslint-disable */
const getters = {
  bookList: state => state.list,
  bookItem: state => state.book,
};


const mutations = {
  [types.GET_BOOK_ITEM_SUCCESS](state, book) {
    state.book = book;
  },
  [types.GET_BOOK_LIST_SUCCESS](state, list) {
    state.list = list;
  },
  [types.INIT_BOOK_ITEM](state) {
    state.book = state.list[0];
  },
  [types.DESTROY_BOOK_ITEM](state) {
    state.book = {};
  },
};
/* eslint-disable */
const actions = {
  fetchBookList({ commit }, query) {
    //commit(GET_BOOK_LIST);
    getBookList(query).then( res => {
      commit( types.GET_BOOK_LIST_SUCCESS, res.body.books )
    } );
  },
  fetchBookItem({ commit }, query) {
    return getBookItem(query).then( res => commit( types.GET_BOOK_ITEM_SUCCESS, res.body ) )
  },
  initBookItem({ commit }) {
    if (state.list[0]){ 
      commit( types.INIT_BOOK_ITEM );
      return;
    }
    let timer = setInterval(function(){
       if (state.list[0]) {
         commit( types.INIT_BOOK_ITEM )
         clearInterval(timer);
       }
    },200)
  }, 
  destroyBookItem({ commit }) {
    commit( types.DESTROY_BOOK_ITEM )
  }
};

export default {state, getters, mutations, actions};
