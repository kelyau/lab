export function insertSortFor(arr){
  var tar = arr.map(i => i);
  for (var i = 1, len = tar.length; i < len; i++) {
    var pos;
    for (var j = i -1; j  > 0; j --){
      if (tar[i] < tar[j]) {
         pos = j;
      }
    }
    if (pos > 1) {
       var tmp = tar.splice(i, 1)[0];
       tar.splice(pos-1, 0, tmp);
    }else if (pos == 0){
       tar.unshif(tmp)
    }
  }
  return tar
}
