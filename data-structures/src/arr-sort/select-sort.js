export function selectSortFor(arr) {
  var tar = arr.map(i => i);
  for (var i = 0, len = tar.length; i < len; i++) {
    var pos = i;
    var val = tar[pos]
    for (var j = i; j < len; j ++) {
      if (val > tar[j]){
        val = tar[j];
        pos = j;
      }
    }
    var tmp = tar[i];
    tar[i] = tar[pos];
    tar[pos] = tmp;
  }
  return arr;
}
