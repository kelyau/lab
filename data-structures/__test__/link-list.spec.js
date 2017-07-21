import {Node, LList, CList} from '../src/link-list';

test('test link list', () => {
  var cities = new LList;
  cities.insert('Conway', 'head');
  cities.insert('Russellville', 'Conway');
  cities.insert('Alma', 'Russellville');
  expect(cities.display()).toEqual(['Conway', 'Russellville', 'Alma'])
  cities.remove('Russellville');
  expect(cities.display()).toEqual(['Conway', 'Alma'])
  expect(cities.show()).toBe('head')

  cities.next()
  expect(cities.show()).toBe('Conway')

  cities.prev()
  expect(cities.show()).toBe('head')
})

test('test circle link list', () => {
  var c = new CList;
  Array(10).fill(1).forEach((i, index) => {
    if (!index) {
      c.insert(index + 1, 'head');
    } else {
      c.insert(index + 1, index);
    }
  })
  expect(c.display()).toEqual([1,2,3,4,5,6,7,8,9,10])
  expect(c.count()).toBe(10);
  var n = 3;
  while (c.count() > 2) {
    c.advance(n);
    c.remove(c.posNode.element);
  }
  expect(c.display()).toEqual([4, 10])
})
