import * as d3 from 'd3';
import {BST} from './bst';

export default function(rootElement){
  var bst = new BST;
  [292,3773,377,26,13,4772,372,371,33,8,3723,763,2365,54].forEach(i => bst.insert(i));
  var bstContext = d3.select(rootElement).append('svg');
  bstContext.attr('width', window.innerWidth)
            .attr('height', 400)
}
