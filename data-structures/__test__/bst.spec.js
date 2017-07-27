import {BST} from '../src/bst';

test('test bst', () => {
  var bst = new BST;
  [34,35,94,23,34,234,32,534,6,8832,37,93,223,623,344].forEach(i => bst.insert(i))
  expect(bst.max()).toBe(8832);  
  expect(bst.min()).toBe(6);
  expect(bst.find(23).show()).toBe(23)
  expect(bst.find(100)).toBeNull();
  
  bst.remove(35);
  expect(bst.find(35)).toBeNull();
  
})
