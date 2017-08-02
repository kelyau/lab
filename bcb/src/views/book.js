import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'div',
  className: 'col-md-3 col-xs-12 book-container',
  render: function(){
    this.$el.html(this.template( this.model.toJSON() ));
    return this;
  },
  template: function(state){
    return `<img src="${state.coverimage}">
    <ul>
      <li>${state.title}</li>
      <li>${state.author}</li>
      <li>${state.releasedate}</li>
      <li>${state.keywords}</li>
    </ul>`
  }
})