import { getBookList, getBookItem } from '../service/http';

export const fetchBookList = ({ dispatch }) => {
  dispatch('FETCH_BOOK_LIST');
  getBookList.then((res) => {
    dispatch('FETCH_BOOK_LIST_SUCCESS', res.json());
  });
};

export const fetchBookItem = ({ dispatch }) => {
  dispatch('FETCH_BOOK_ITEM');
  getBookItem.then((res) => {
    dispatch('FETCH_BOOK_ITEM_SUCCESS', res.json());
  });
};
