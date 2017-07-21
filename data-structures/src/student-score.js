export default function (name) {
  return {
    name: name,
    scoreList: [],
    add: function(obj) {this.scoreList.push(obj)},
    average: function() {
      if (!this.scoreList.length) {
        return 0;
      }
      return this.scoreList.reduce((acc, cur) => acc + cur.score, 0) / this.scoreList.length;
    }
  }
}
