import List from './list';
import bst from './bst-graph';

export default {
  run(){
    [1,2,3].map(item => console.log(item))
    console.log('success!**')

    var bstElement = document.createElement('div');
    document.body.appendChild(bstElement);
    bst(bstElement);
  }
}
