export function bubbleSortFor(arr){
  var tarArr = arr.map(i => i);
  for (var i = 0, len = tarArr.length; i < len; i++){
    for (var j = 0; j < len - i; j ++)
    if (tarArr[j] > tarArr[j + 1]){
      var tmp = tarArr[j];
      tarArr[j] = tarArr[j + 1];
      tarArr[j + 1] = tmp;
    }
  }
  return tarArr;
}
export function bubbleSortRecursion(arr){
  var tarArr = arr.map(i => i);
  return recursion(arr);
}
function recursion(arr, len) {
  len = len || arr.length;
  if (len < 2) {
    return arr;
  }
  for (var i=0; i < len; i ++){
    if (arr[i] > arr[i+1]){
      var tmp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = tmp;
    }
  }
  return recursion(arr, len - 1);
}