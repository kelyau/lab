export function Node(element) {
  this.element = element;
  this.next = null;
}

export function LList() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
  this.findPrevious = findPrevious;
  this.posNode = this.head;
  this.next = next;
  this.prev = prev;
  this.show = show;
}

export function CList() {
  this.head = new Node('head');
  this.head.next = this.head;
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
  this.findPrevious = findPrevious;
  this.posNode = this.head;
  this.advance = advance;
  this.back = back;
  this.count = count;
}

function find(item) {
  var currNode = this.head;
 
  while(currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
};
function findPrevious(item) {
  var currNode = this.head;
  while(!(currNode.next == null) && (currNode.next.element != item)) {
    currNode = currNode.next;
  }
  return currNode;
}
function insert(newElement, item) {
  var newNode = new Node(newElement);
  var current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
};
function remove(item) {
   var prevNode = this.findPrevious(item);
   if (prevNode.next != null) {
     prevNode.next = prevNode.next.next;
   }
};
function display() {
  var currNode = this.head;
  var tmp = [];
  while(!(currNode.next == null) && !(currNode.next.element === 'head')) {
    tmp.push(currNode.next.element);
    currNode = currNode.next;
  }
  return tmp;
};
function next() {
  if (!this.posNode.next){
    return;
  }
  this.posNode = this.posNode.next;
}
function prev() {
  if (this.posNode.element === 'head') {
    return;
  }
  this.posNode = this.findPrevious(this.posNode.element)
}
function show() {
  return this.posNode.element
}

function advance(n) {
  while(n > 0) {
    if (this.posNode.next.element === 'head') {
      this.posNode = this.posNode.next.next;
    }else{
      this.posNode = this.posNode.next;
    }
    n--;
  }
}

function back(n) {
}

function count() {
  var node = this.head;
  var i = 0;
  while (!(node.next.element === 'head')){
    node =node.next;
    i ++;
  }
  return i;
}
