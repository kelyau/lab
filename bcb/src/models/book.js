import Backbone from 'backbone';

export default Backbone.Model.extend({
  default: {
    coverimage: 'img/placeholder.png',
    title: 'no title',
    author: 'unknown',
    releasedate: 'unknown',
    keywords: 'none'
  }
})