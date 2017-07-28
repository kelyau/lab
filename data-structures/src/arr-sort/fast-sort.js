export function fastSortFor(arr){
  var tar = arr.map(i => i);
  return fast(tar); 
}

function fast(arr){
  if (arr.length < 2){
    return arr;
  }
  var midPos = Math.ceil(arr.length /2);
  var midVal = arr.splice(midPos, 1)[0];
  var left = [];
  var right = [];
  for (var i=0, len = arr.length; i < len; i++) {
    if (arr[i] < midVal){
       left.push(arr[i])
    }else{
       right.push(arr[i])
    }
  }
  return fast(left).concat([midVal], fast(right));
}

