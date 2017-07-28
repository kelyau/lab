export function mergeSortRec(arr){
  var len = arr.length;
  if (len < 2){
    return arr;
  }
  var midPos = Math.floor(len / 2);
  var left = arr.slice(0, midPos);
  var right =arr.slice(midPos);
  return merge(mergeSortRec(left), mergeSortRec(right));
}
function merge(left, right){
  var result = [];
  while(left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    }else{
      result.push(right.shift())
    }
  }
  while(left.length){
    result.push(left.shift());
  }
  while(right.length){
    result.push(right.shift())
  }
  return result;
}