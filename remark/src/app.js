import scrollbar from './scrollbar';
import guide from './guide';
import {elementStyle, elementClass, elementRemoveClass} from './util';

export default {
  run(){
    if (!window.getComputedStyle) {
      alert('sorry not support this browser');
      return;
    }
    scrollbar.start({
      reverse: true,
    });
    window.addEventListener('resize', scrollbar.reset);
    
    var scrollbarY = document.querySelector('.scrollbar-y-wrap');
    var upEvent =  'ontouchstart' in window ? 'touchstart' : 'mousedown';

    if (scrollbarY && elementStyle(scrollbarY, 'display') === 'block') {
      var scrollbarGuide = guide({
        className: 'modal-guide',
        content: `<div class="scrollbar-guide"><h3>拖动横向滚动条可以滚动内容</h3></div>`,
        closeCallback: function(){
          scrollbarY.removeEventListener(upEvent, scrollbarGuide.close, false)
        }
      });
      elementClass(scrollbarY, 'guide-active', true);
      
      scrollbarY.addEventListener(upEvent,scrollbarGuide.close, false)
    }
    
  }
}