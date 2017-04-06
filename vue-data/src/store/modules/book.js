import { getBookList, getBookItem } from '@/service/http';
import {
  // GET_BOOK_ITEM,
  GET_BOOK_ITEM_SUCCESS,
  // GET_BOOK_LIST,
  GET_BOOK_LIST_SUCCESS,
} from '../types';

const state = {
  list: [],
  book: '',
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
  }
};



export default { state, mutations, actions, getters };
