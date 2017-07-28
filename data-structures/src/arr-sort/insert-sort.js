export function insertSortFor(arr){
  var tar = arr.map(i => i);
  var len = arr.length;
  var current;
  
  for (var i= 1; i < len; i++){

    current = tar[i];
    for (var j = i; j > 0; j--){
      if (tar[j -1] > current){
        tar[j] = tar[j - 1];
        if (j === 1){
          tar[j - 1] = current;
        }
      }else{
        tar[j] = current;
        break;
      }
    } 
  }

  return tar
}

