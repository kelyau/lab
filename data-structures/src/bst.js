export function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}
function show() {
  return this.data;
}

export function BST() {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
  this.max = max;
  this.min = min;
  this.find = find;
  this.remove = remove;
  this.removeNode = removeNode;
}

function insert(data) {
  var n = new Node(data, null, null);
  if (!this.root) {
    return this.root = n;
  }
  var current = this.root;
  var parent;
  while(true) {
    parent = current;
    if (data < current.data) {
      current = current.left;
      if (current === null) {
         parent.left = n;
         break;
      }
    } else {
      current = current.right;
      if (current === null) {
        parent.right = n;
        break;
      }
    }
  }
}
function inOrder(node, res){
  res = res || [];
  if (node !== null) {
    inOrder(node.left, res);
    res.push(node.show()) 
    inOrder(node.right, res);   
  }
  return res;
}
function preOrder(node, res) {
  res = res || [];
  if (node !== null) {
    res.push(node.show());
    preOrder(node.left, res);
    preOrder(node.right, res);
  }
  return res;
}
function postOrder(node, res) {
  res = res || [];
  if (node !== null) {
    postOrder(node.left, res);
    postOrder(node.right, res);
    res.push(node.show())
  }
  return res;
}
function max(){
  var current = this.root;
  while(current.right !== null) {
    current = current.right;
  }
  return current.show();
}
function min(){
  var current = this.root;
  while(current.left != null) {
    current = current.left;
  }
  return current.show();
}
function find(data) {
  var current = this.root;
  while(current != null) {
    if(current.show() === data) {
      return current;
    }else if(data < current.show()) {
      current = current.left
    }else{
      current = current.right;
    }
  }
  return null; 
}
function remove(data){
  var root = removeNode(this.root, data)
}
function removeNode(node, data){
  if (node === null) {
    return null;
  }
  if (data === node.data) {
    if (node.left === null && node.right === null){
      return null;
    }
    if (node.left === null){
      return node.right;
    }
    if (node.right === null){
      return node.left
    }
     //2 node
    var tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  }else if(data < node.data){
    node.left = removeNode(node.left, data);
    return node;
  }else{
    node.right = removeNode(node.right, data);
    return node;
  }
}
function getSmallest(node) {
  if (node.left === null) {
    return node;
  }else{
    return getSmallest(node.left)
  }
}
