import Backbone from 'backbone';
import BookModel from '../models/book';
var collection;
export default function(init){
  if (collection) {
    return collection;
  }
  var Library = Backbone.Collection.extend({
    model: BookModel
  })
  return collection = new Library(init || '');
} 