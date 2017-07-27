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
function recursion(arr, i, j) {
  i = i || 0;
  j = j || arr.length;
  console.log('i',i);
  console.log('j',j);
  if (i < j && j > 0){
    if (arr[i] > arr[i +1]){
      var tmp = arr[i];
      arr[i] = arr[i +1];
      arr[i +1] = tmp;
    }
    recursion(arr, i + 1, j);
    recursion(arr, i, j - 1);
  }else{
    return arr;
  }
}