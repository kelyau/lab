import Vue from 'vue';
import list from '@/components/list';

function getRenderedList(Component, propsData) {
  const Ctl = Vue.extend(Component);
  const vm = new Ctl({ propsData }).$mount();
  return vm.$el.querySelectorAll('li');
}

describe('list.vue', () => {
  it('should render list', () => {
    expect(getRenderedList(list, {
      books: [
        { id: 1, title: '3title' },
        { id: 2, title: '2title' },
        { id: 3, title: '3title' },
      ],
    }).length).equal(3);
  });
});
