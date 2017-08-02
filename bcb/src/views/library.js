import Backbone from 'backbone';
import LibraryCollection from '../collections/library';
import BookView from './book';
import * as BookService  from '../service/book';

export default Backbone.View.extend({
  tagName: 'div',
  className: 'container library-container',
  initialize: function(){
    this.collection = LibraryCollection();
    this.render();

    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.renderBook);

    BookService.getList().then(res => res.json()).then(res => {
      this.collection.reset(res.results);
    })
  },
  render: function() {
    console.log('rest library collection')
    this.collection.each(item => {
      this.renderBook(item);
    })
  },
  renderBook: function(item){
    console.log('add library collection')
    var bookView = new BookView({model: item});
    this.$el.append(bookView.render().el)
  }
})