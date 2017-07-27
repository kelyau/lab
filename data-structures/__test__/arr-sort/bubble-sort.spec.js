import {bubbleSortFor, bubbleSortRecursion} from '../../src/arr-sort/bubble-sort';

var baseArray = [],
    correctArray = [];

beforeEach(() => {
  baseArray = [35, 25, 81, 29, 80, 38, 92, 8, 60, 44, 47, 6, 10, 96, 80, 83, 79, 26, 57, 2, 67, 86, 42, 94, 57, 85, 34, 37];
  correctArray = baseArray.map(i => i).sort((a,b) => a-b);
});

test('test bubble sort array by for loop', () => {
  expect(bubbleSortFor(baseArray)).toEqual(correctArray);
})

test('test bubble sort array by recursion', () => {
  expect(bubbleSortRecursion(baseArray)).toEqual(correctArray);
})