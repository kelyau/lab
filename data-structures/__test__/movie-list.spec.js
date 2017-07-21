import {movieList, customerList} from '../src/movie-list';

var movies = movieList();
var customers = customerList();

test('add movie', () => {
  movies.append('满城尽带黄金甲');
  movies.append('微微一笑很倾城');
  movies.append('齐天大圣');
  expect(movies.length()).toBe(3)
})
