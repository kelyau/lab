import Backbone from 'backbone';
import * as BookService from '../service/book';
import LibraryCollection from '../collections/library';
import BookModel from '../models/book';

export default Backbone.View.extend({
  tagName: 'div',
  className: 'container add-book-container',
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template);
  },
  events: {
    'click #js-submit': 'addBook',
    'click #js-reset': 'resetBook'
  },
  addBook: function(e){
    e.preventDefault();
    var data = {};
    var input$ = this.$el.find('input');
    input$.each((i, element) => {
      data[element.getAttribute('name')] = element.value;
    });
    BookService.postItem(data)
      .then(res => res.json())
      .then(res => BookService.getItem(res.objectId))
      .then(res => res.json())
      .then(res => {
        this.resetBook();
        var collection = LibraryCollection();
        collection.add(new BookModel(res));

      })
  },
  resetBook: function(e){
    e && e.preventDefault();
    var input$ = this.$el.find('input');
    input$.each((i, element) => {
      element.value = '';
    })
  },
  template: `<div class="row">
      <form class="form-inline"  action="#">
        <div class="form-group col-md-4">
          <label>CoverImage:</label>
          <input type="text" class="form-control" name="coverimage">
        </div>
        <div class="form-group col-md-4">
          <label>Title:</label>
          <input type="text" class="form-control" name="title">
        </div>
        <div class="form-group col-md-4">
          <label>Author:</label>
          <input type="text" class="form-control" name="author">
        </div>
        <div class="form-group col-md-4">
          <label>Release Date:</label>
          <input type="date" class="form-control" name="releasedate">
        </div>
        <div class="form-group col-md-4">
          <label>Keywords:</label>
          <input type="text" class="form-control" name="keywords">
        </div>
      </form>
    </div>
    <p>&nbsp;</p>
    <div class="row">
      <div class="col-md-2">
        <button class="btn btn-success" id="js-submit">Submit</button>
      </div>
      <div class="col-md-2">
        <button class="btn" id="js-reset">Reset</button>
      </div>
    </div>`
})