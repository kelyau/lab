var evOut = Backbone.View.extend({
  tagName: "pre",
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.model.number)
    return this
  }
})
var evDemo = Backbone.View.extend({
  store: {
    number: 0
  },
  el: $("#ev-demo"),
  render: function() {
    this.update(0)
  },
  update: function(opt){
    this.store.number += opt
    var view = new evOut({model: this.store})
    this.$("#ev-out").html(view.render().el)
  },
  initialize: function(){
    this.render()
    Bacon.fromEvent(document.getElementById("btn-a"), "click")
     .onValue(() => {this.update(1)});

    Bacon.fromEvent(document.getElementById("btn-d"), "click")
        .onValue(() => {this.update(-1)})  
  }
});
var evApp = new evDemo;
var evDemo1 = Backbone.View.extend({
  store: {
    number: 0
  },
  el: $("#ev-demo"),
  render: function() {
    this.update(0)
  },
  update: function(opt){
    this.store.number += opt
    var view = new evOut({model: this.store})
    this.$("#ev-out1").html(view.render().el)
  },
  initialize: function(){
    this.render()
    Bacon.fromEvent(document.getElementById("btn-a1"), "click")
     .onValue(() => {this.update(1)});

    Bacon.fromEvent(document.getElementById("btn-d1"), "click")
        .onValue(() => {this.update(-1)}) 
  }
});
var evApp1 = new evDemo1;

var arrayOut = Backbone.View.extend({
  tagName: "pre",
  initialize: function(){
    this.render()
  },
  render: function(){
    this.$el.text(this.model.array)
    return this;
  }
})
var arrayDemo = Backbone.View.extend({
  el: $("#array-demo"),
  store: [1,2,3,4,5,6],
  events: {
    "click button": "run"
  },
  render: function(){
    this.$el.find("pre").text("[" + this.store + "]")
  },
  initialize: function(){
    this.render()
  },
  update: function(opt){
    var view = new arrayOut({model: opt})
    this.$("#array-out").html(view.render().el)
  },
  run: function(){
    var model = {
      array: []
    };
    var stream = Bacon.sequentially(200, [1,2,3,4,5,6])
      .flatMap( i => i*2)
      .onValue( i => {
        model.array.push(i)
        this.update(model)
      })
  }
})
var arrayApp = new arrayDemo

   