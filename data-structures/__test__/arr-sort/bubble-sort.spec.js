import {bubbleSortFor, bubbleSortRecursion} from '../../src/arr-sort/bubble-sort';

var baseArray = [],
    correctArray = [];

beforeEach(() => {
  baseArray = Array(33).fill(1).map(i => Math.floor(Math.random * 100));
  correctArray = baseArray.map(i => i).sort((a,b) => a-b);
});

test('test bubble sort array by for loop', () => {
  expect(bubbleSortFor(baseArray)).toEqual(correctArray);
})

test('test bubble sort array by recursion', () => {
})
