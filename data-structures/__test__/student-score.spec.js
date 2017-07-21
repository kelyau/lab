import studentScore from '../src/student-score';

var simpleList = studentScore('语文');

test('simpleList add', () => {
  simpleList.add({name: 'Jack', score: 98});
  simpleList.add({name: 'Blob', score: 96});
  expect(simpleList.scoreList.length).toBe(2);
})

test('simpleList score average', () => {
  expect(simpleList.average()).toBe(97)
})
