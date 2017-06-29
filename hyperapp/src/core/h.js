export default function(tag, data, ...stack) {
  var node,
      children = [];
  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i]
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + ""
      }
      children[children.length] = node
    }
  }
  if (typeof tag === 'string') {
    return { tag, data: data || {}, children }
  }
  return tag(data, children)
}