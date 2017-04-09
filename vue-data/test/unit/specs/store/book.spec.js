import book from '@/store/modules/book';


// 用指定的 mutaions 测试 action 的辅助函数
const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0;
  // 模拟提交
  const commit = (type, payload) => {
    const mutation = expectedMutations[count];
    expect(mutation.type).to.equal(type);
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload);
    }
    /* eslint-disable */
    count++
    if (count >= expectedMutations.length) {
    }
    /* eslint-enable */
  };
  // 用模拟的 store 和参数调用 action
  action({ commit, state }, ...args);

  // 检查是否没有 mutation 被 dispatch
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
  }
  done('123');
};

describe('store book test', () => {
  it('fetchBookList', () => {
    const done = sinon.spy();
    testAction(book.actions.fetchBookList, [{ tag: 'zh' }], {}, [
      { type: 'GET_BOOK_LIST_SUCCESS' },
    ], done);
    expect(done).to.have.been.calledWith('123');
  });
});
