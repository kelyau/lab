import {fastSortFor} from '../../src/arr-sort/fast-sort';

var baseArray = [];
var correctArray = [];
beforeEach(() => {
  baseArray = Array(32).fill(1).map(() => Math.floor(Math.random() * 100));
  correctArray = baseArray.sort((a,b) => a-b);

})
test('test array sort by fast sort', () => {
  expect(fastSortFor(baseArray)).toEqual(correctArray);
})
