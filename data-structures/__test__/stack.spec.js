import Stack from '../src/stack';

var stack;
test('create stack instance', () => {
  stack = new Stack;
  expect(stack).toBeInstanceOf(Stack)
})

test('stack methods', () => {
  stack.push('David');
  stack.push('Raymod');
  stack.push('Bryan');
  expect(stack.length()).toBe(3);
  expect(stack.peek()).toBe('Bryan')
  expect(stack.pop()).toBe('Bryan')
  expect(stack.length()).toBe(2)
  
  stack.clear();
  expect(stack.peek()).toBeUndefined();
})
test('stack example 数字2进制', () => {
  function mulBase(num, base) {
    var s = new Stack;
    do {
      s.push(num % base);
      num = Math.floor( num /= base);
    } while (num > 0)
   
    var converted = '';
    while(s.length() > 0){
       converted += s.pop()
    }
    return converted;
  }
  expect(mulBase(32,2)).toBe('100000')
})

test('stack example 回文判断', () => {
  function isPalindrome(word) {
    var s = new Stack;
    [].slice.apply(word).forEach((i) => {
       s.push(i)
    })
    var rword = '';
    while(s.length() >0) {
      rword += s.pop()
    }
    return word === rword
  }

  expect(isPalindrome('hello')).not.toBeTruthy()
  expect(isPalindrome('racecar')).toBeTruthy()
})
