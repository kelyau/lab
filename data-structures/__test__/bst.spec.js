import {BST} from '../src/bst';

var baseArray = [34,35,94,23,34,234,32,534,36,6,8832,37,93,223,623,344];
var correctArray = baseArray.map(i => i).sort((a, b) => a -b);
test('test bst', () => {
  var bst = new BST;
  baseArray.forEach(i => bst.insert(i))
  expect(bst.max()).toBe(8832);  
  expect(bst.min()).toBe(6);
  expect(bst.find(23).show()).toBe(23)
  expect(bst.find(100)).toBeNull();
  
  bst.remove(35);
  expect(bst.find(35)).toBeNull();
  bst.insert(35)
  expect(bst.inOrder(bst.root)).toEqual(correctArray);
})
