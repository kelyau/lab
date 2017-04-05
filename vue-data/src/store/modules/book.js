import { getBookList, getBookItem } from '@/service/http';
import {
  GET_BOOK_ITEM,
  GET_BOOK_ITEM_SUCCESS,
  GET_BOOK_LIST,
  GET_BOOK_LIST_SUCCESS,
} from '../types';

const state = {
  list: [],
  book: '',
};
/* eslint-disable */
const getters = {
  bookList: state => state.list
};


const mutations = {
  [GET_BOOK_ITEM_SUCCESS](state, book) {
    
    state.book = book;
  },
  [GET_BOOK_LIST_SUCCESS](state, list) {
    state.list = list;
  },
};
/* eslint-disable */
const actions = {
  fetchBookList({ commit }) {
    commit(GET_BOOK_LIST);
    getBookList().then( res => commit( GET_BOOK_LIST_SUCCESS, res.json() ) )
  },
  fetchBookItem({ commit }) {
    commit(GET_BOOK_ITEM);
    getBookItem().then( res => commit( GET_BOOK_ITEM_SUCCESS, res.json() ) )
  }
};



export default { state, mutations, actions, getters };
