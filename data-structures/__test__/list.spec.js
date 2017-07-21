import List from '../src/list';

var  list = new List;

test('test list append function', () => {
  list.append('a');
  list.append('b');
  list.append('c');
  expect(list.length()).toBe(3); 
})

test('test list toString function', () => {
  expect(list.toString()).toEqual(['a','b','c'])
})

test('test list find function', () => {
  expect(list.find('b')).toBe(1);
  expect(list.find('z')).toBe(-1)
})

test('test list insert function', () => {
  list.append('e')
  list.insert('d', 'c')
  expect(list.toString()).toEqual(['a','b','c','d','e'])
})

test('test list remove function', () => {
  list.remove('e');
  expect(list.toString()).toEqual(['a','b','c','d'])
})

test('test list pos', () => {
    list.end()
    expect(list.currPos()).toBe(list.toString().length -1);
    list.front()
    expect(list.currPos()).toBe(0)
    list.next();
    list.next();
    expect(list.currPos()).toBe(2)
    list.prev();
    expect(list.currPos()).toBe(1)
    list.moveTo(3);
    expect(list.currPos()).toBe(3)
})

test('test list get', () => {
  list.moveTo(1);
  expect(list.getElement()).toBe('b')
})

