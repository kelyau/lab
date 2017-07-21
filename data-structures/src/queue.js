export default function() {
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back;
  this.toString = toString;
  this.empty = empty;
}

function enqueue(element) {
  this.dataStore.push(element);
}
function dequeue() {
  this.dataStore.shift();
}
function front() {
  return this.dataStore[0];
}
function back() {
  return this.dataStore[this.dataStore.length - 1];
}
function toString() {
  var retStr = '';
  this.dataStore.forEach(i => {
    retStr += i + '\n'
  })
  return setStr
}
function empty() {
  return !this.dataStore.length
}
