import Dictionary from '../src/dictionary';

test('test dictionary', () => {
  var pbook = new Dictionary;
  pbook.add('Mike', '123');
  pbook.add('David', '345');
  pbook.add('Cynthia', '456');
  expect(pbook.find('Cynthia')).toBe('456');
  pbook.remove('Cynthia');
  expect(pbook.find('Cynthia')).toBeUndefined();
  expect(pbook.count()).toBe(2);
  pbook.clear();
  expect(pbook.count()).toBe(0);
});
