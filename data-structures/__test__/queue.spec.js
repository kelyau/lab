import Queue from '../src/queue';

test('test queue', () => {
  var q = new Queue;
  expect(q.empty()).toBeTruthy();

  q.enqueue('Meredith');
  q.enqueue('Cynthia');
  q.enqueue('Jenifrer');
  
  expect(q.back()).toBe('Jenifrer');
  
  q.dequeue()
  
  expect(q.front()).toBe('Cynthia');
})


