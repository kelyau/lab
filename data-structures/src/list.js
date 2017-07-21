export default List;

function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
}
List.prototype = {
  clear: function(){
    this.dataStore.length = 0;
    this.listSize = 0;
    this.pos = 0;
  },
  find: function(element){
    for (let i=0; i < this.listSize; i++) {
      if (this.dataStore[i] == element) {
        return i;
      }
    }
    return -1;
  },
  toString: function(){
    return this.dataStore;
  },
  insert: function(element, after){
    let insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, element)
      ++this.listSize;
      return true;
    }
    return false;
  },
  append: function(element){
    this.dataStore[this.listSize++] = element
  },
  remove: function(element){
    let _index = this.find(element);
    if (_index > -1) {
      this.dataStore.splice(_index, 1);
      --this.listSize;
      return true;
    }
    return false;
  },
  front: function(){
    this.pos = 0;
  },
  end: function(){
    this.pos = this.listSize - 1;
  },
  prev: function(){
    if (this.pos > 0) {
      --this.pos;
    }
  },
  next: function(){
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  },
  length: function(){
    return this.listSize;
  },
  currPos: function(){
    return this.pos;
  },
  moveTo: function(position){
    if (position > this.listSize - 1) {
      return  this.end() 
    }
    this.pos = position;
  },
  getElement: function(){
    return this.dataStore[this.pos];
  },
  contains: function(element){
    return this.find(element) > -1
  }
}
