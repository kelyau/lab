import { getBookList, getBookItem } from '@/service/http';
import Bacon from 'baconjs';
import {
  // GET_BOOK_ITEM,
  GET_BOOK_ITEM_SUCCESS,
  // GET_BOOK_LIST,
  GET_BOOK_LIST_SUCCESS,
  INIT_BOOK_ITEM,
  DESTROY_BOOK_ITEM,
} from '../types';

window.Bacon = Bacon;
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
  [GET_BOOK_ITEM_SUCCESS](state, book) {
    state.book = book;
  },
  [GET_BOOK_LIST_SUCCESS](state, list) {
    state.list = list;
  },
  [INIT_BOOK_ITEM](state) {
    state.book = state.list[0];
  },
  [DESTROY_BOOK_ITEM](state) {
    state.book = {};
  },
};
/* eslint-disable */
const actions = {
  fetchBookList({ commit }, query) {
    //commit(GET_BOOK_LIST);
    getBookList(query).then( res => {
      commit( GET_BOOK_LIST_SUCCESS, res.body.books )
    } );
  },
  fetchBookItem({ commit }, query) {
    //commit(GET_BOOK_ITEM);
    getBookItem(query).then( res => commit( GET_BOOK_ITEM_SUCCESS, res.body ) )
  },
  initBookItem({ commit }) {
    if (state.list[0]){ 
      commit( INIT_BOOK_ITEM );
      return;
    }
    let timer = setInterval(function(){
       if (state.list[0]) {
         commit( INIT_BOOK_ITEM );
         clearInterval(timer);
       }
    },200)
  }, 
  destroyBookItem({ commit }) {
    commit( DESTROY_BOOK_ITEM )
  }
};



export default { state, mutations, actions, getters };
