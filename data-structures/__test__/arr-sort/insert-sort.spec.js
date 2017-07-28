import {insertSortFor} from '../../src/arr-sort/insert-sort';

var baseArray,
    correctArray;
beforeEach(() => {
  baseArray = Array(31).fill(1).map(i => Math.floor(Math.random() * 100));
  correctArray = baseArray.sort((a,b) => a-b);
})
test('test array sort by insert sort', () => {
  expect(insertSortFor(baseArray)).toEqual(correctArray);
})
