import Backbone from 'backbone';
import AddBookView from './views/add-book';
import LibraryView from './views/library';
import * as BookService from './service/book';

var App = Backbone.View.extend({
  el: 'body',
  initialize: function(){
    this.render()
  },
  render: function(){
    var addBookView = new AddBookView;
    this.$el.html(addBookView.$el);
    var libraryView = new LibraryView();
    this.$el.append(libraryView.el);
  }
})
export default {
  run(){
    new App;
  }
}