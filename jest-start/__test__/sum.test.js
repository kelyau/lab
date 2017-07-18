import sum  from '../src/sum';

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('add 1 + 2 to not equal 4', () => {
  expect(sum(1, 2)).not.toBe(4);
})
