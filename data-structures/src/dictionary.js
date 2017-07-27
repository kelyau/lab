export default function() {
  this.add = add;
  this.dataStore = [];
  this.find = find;
  this.remove = remove;
  this.count = count;
  this.clear = clear;
}

function add(key, value) {
  this.dataStore[key] = value;
}
function find(key) {
  return this.dataStore[key];
}
function remove(key) {
  delete this.dataStore[key];
}
function count() {
  return Object.keys(this.dataStore).length;
}
function clear() {
  Object.keys(this.dataStore).forEach(k => delete this.dataStore[k])
}
