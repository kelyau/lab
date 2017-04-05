import {
  GET_BOOK_ITEM_SUCCESS,
  GET_BOOK_LIST_SUCCESS,
} from '../types';

const state = {
  list: [],
  book: '',
};

const mutations = {
  [GET_BOOK_ITEM_SUCCESS](st, book) {
    /* eslint-disable */
    st.book = book;
  },
  [GET_BOOK_LIST_SUCCESS](st, list) {
    st.list = list;
  },
};

export default { state, mutations };
