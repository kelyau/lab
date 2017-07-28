import {mergeSortRec} from '../../src/arr-sort/merge-sort';

var baseArray,
    correctArray;
beforeEach(() => {
  baseArray = Array(31).fill(1).map(i => Math.floor(Math.random() * 100));
  correctArray = baseArray.map(i => i).sort((a,b) => a-b);
})
test('test array sort by merge sort', () => {
  expect(mergeSortRec(baseArray)).toEqual(correctArray);
})
