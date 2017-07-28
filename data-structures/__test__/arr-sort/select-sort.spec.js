import {selectSortFor} from '../../src/arr-sort/select-sort';

var baseArray,
    correctArray;

beforeEach(() => {
  baseArray = Array(33).fill(1).map(i => Math.floor(Math.random * 100));
  correctArray = baseArray.map(i => i).sort((a,b) => a-b);
});

test('test array sort by select sort for loop', () => {
  expect(selectSortFor(baseArray)).toEqual(correctArray);
})