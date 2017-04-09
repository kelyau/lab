import book from '@/store/modules/book';

const commit = (type, res) => {
  expect(type).to.equal('GET_BOOK_LIST_SUCCESS');
  window.console.log(res);
};

describe('store book test', () => {
  it('测试book action', () => {
    book.actions.fetchBookList({ commit }, { tag: 'zh' });
  });
});
