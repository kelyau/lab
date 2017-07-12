import {elementStyle, elementClass, elementRemoveClass} from './util';

var _config = {};

/**
 * 初始化
 * @param {object} config
 * @param {boolean} config.reverse //反转滚动条
 * @param {object} config.yWrap //y滚动条样式
 * @param {object} config.yInner //y滚动条滑块样式
 * @param {object} config.xWrap //x滚动条样式
 * @param {object} config.xInner //x滚动条滑块样式
 * @param {string} config.content //滚动对象
 */
function start(config = {}) {
  //获取容器对象
  _config.scrollWrap = document.getElementById(config.content || 'content');
  _config.reverse = config.reverse;
  //计算和设置容器样式
  _config.wrapHeight = elementStyle(_config.scrollWrap, 'height');
  if (!_config.wrapHeight){
    if (config.height){
      _config.wrapHeight = config.height;
    }else{
      _config.wrapHeight = '100%';
    }
  }
  if (_config.scrollWrap.parentElement === document.body) {
    _config.wrapHeight = window.innerHeight + 'px';
  }
  _config.scrollWrap.className = _config.scrollWrap.className + ' scroll-wrap';
  elementStyle(_config.scrollWrap, {
    height: _config.wrapHeight,
    position: 'relative',
    overflow: 'hidden'
  });

  //创建和设置滚动对象
  _config.scrollContent = document.createElement('div');
  _config.scrollContent.innerHTML = _config.scrollWrap.innerHTML;
  _config.scrollWrap.innerHTML = '';
  _config.scrollWrap.appendChild(_config.scrollContent)
  _config.scrollContent.className = 'scroll-content';
  elementStyle(_config.scrollContent, {
    position: 'relative',
    padding: '10px',
    top: '0'
  });

  //创建滚动条

  _config.scrollbarYWrap = document.createElement('div');
  _config.scrollbarYWrap = _config.scrollWrap.appendChild(_config.scrollbarYWrap);
  _config.scrollbarYWrap.className = 'scrollbar-wrap scrollbar-y-wrap';

  _config.scrollbarYInner = document.createElement('div');
  _config.scrollbarYInner = _config.scrollbarYWrap.appendChild(_config.scrollbarYInner);
  _config.scrollbarYInner.className = 'scrollbar-inner';
 
  var scrollbarYInnerHeight = (parseInt(elementStyle(_config.scrollWrap, 'height')) / parseInt(elementStyle(_config.scrollContent, 'height')));
  if (scrollbarYInnerHeight === 1) {
    elementStyle(_config.scrollbarYWrap, 'display', 'none');
  }

  _config.scrollbarXWrap = document.createElement('div');
  _config.scrollbarXWrap = _config.scrollWrap.appendChild(_config.scrollbarXWrap);
  _config.scrollbarXWrap.className = 'scrollbar-wrap scrollbar-x-wrap';

  _config.scrollbarXInner = document.createElement('div');
  _config.scrollbarXInner = _config.scrollbarXWrap.appendChild(_config.scrollbarXInner);
  _config.scrollbarXInner.className = 'scrollbar-inner';

  var scrollbarXInnerWidth = (parseInt(elementStyle(_config.scrollWrap, 'width')) / parseInt(elementStyle(_config.scrollContent, 'width')))
  if (scrollbarXInnerWidth === 1) {
    elementStyle(_config.scrollbarXWrap, 'display', 'none');
  }

  var scrollbarStyle = {
    yWrap: {
      position: 'absolute',
      width: '6px',
      height: '100%',
      top: 0,
      right: 0
    },
    yInner: {
      position: 'absolute',
      width: '6px',
      top: 0,
      right: 0,
      background: '#999',
      height: scrollbarYInnerHeight * 100 + '%'
    },
    xWrap: {
      position: 'absolute',
      width: '100%',
      height: '6px',
      left: 0,
      bottom: 0
    },
    xInner: {
      position: 'absolute',
      height: '6px',
      left: 0,
      bottom: 0,
      background: '#999',
      width: scrollbarXInnerWidth * 100 + '%'
    }
  }

  if (config.reverse){
    //设置反转
    scrollbarStyle = {
      yWrap: {
        position: 'absolute',
        height: '16px',
        width: '100%',
        bottom: 0,
        left: 0,
      },
      yInner: {
        position: 'absolute',
        height: '16px',
        bottom: 0,
        left: 0,
        background: '#999',
        width: scrollbarYInnerHeight * 100 + '%'
      },
      xWrap: {
        position: 'absolute',
        width: '16px',
        height: '100%',
        right: 0,
        top: 0
      },
      xInner: {
        position: 'absolute',
        width: '16px',
        right: 0,
        top: 0,
        background: '#999',
        height: scrollbarXInnerWidth * 100 + '%'
      }
    }
  }
  elementStyle(_config.scrollbarYWrap, Object.assign({}, scrollbarStyle.yWrap, config.yWrap));
  elementStyle(_config.scrollbarYInner, Object.assign({}, scrollbarStyle.yInner, config.yInner));
  elementStyle(_config.scrollbarXInner, Object.assign({}, scrollbarStyle.xInner, config.xInner));
  elementStyle(_config.scrollbarXWrap, Object.assign({}, scrollbarStyle.xWrap, config.xWrap));

  //滚动事件
  
  //兼容手机touch
  if ('ontouchstart' in window) {
    _config.scrollEvents = {
      touchstart: enableMoving,
      touchmove: moveContent,
      touchend: stopMoving
    }
  } else {
    _config.scrollEvents = {
      mousedown: enableMoving,
      mousemove: moveContent,
      mouseup: stopMoving,
      mouseleave: stopMoving
    };
  }

  /**
   * 拖动开始
   * @param {event} e 
   */
  function enableMoving(e) {
    if (!checkScrollbarInner(e)){
      return;
    }
    e.preventDefault();
    elementClass(e.target, 'draggable', true);
    _config.startY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    _config.startX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (e.target === _config.scrollbarYInner) {
      if (config.reverse) {
        _config.scrollbarYInnerLeft = parseInt(elementStyle(e.target, 'left'));
      } else {
        _config.scrollbarYInnerTop = parseInt(elementStyle(e.target, 'top'));
      }
    }
    if (e.target === _config.scrollbarXInner) {
      if (config.reverse){
        _config.scrollbarXInnerTop = parseInt(elementStyle(e.target, 'too'));
      } else {
        _config.scrollbarXInnerLeft = parseInt(elementStyle(e.target, 'left'));
      }
    } 
  };

  /**
   * 拖动
   * @param {event} e 
   */
  function moveContent(e) {
    if (elementClass(_config.scrollbarYInner, 'draggable')) {
      //垂直滚动条
      _config.offsetY = config.reverse ? (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - _config.startX  : (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - _config.startY;
      _config.scrollbarYRatio = config.reverse ?
                             (_config.scrollbarYInnerLeft + _config.offsetY) / (parseInt(elementStyle(_config.scrollWrap, 'width')) - parseInt(elementStyle(_config.scrollbarYInner, 'width'))) 
                             : (_config.scrollbarYInnerTop + _config.offsetY) / (parseInt(elementStyle(_config.scrollWrap, 'height')) - parseInt(elementStyle(_config.scrollbarYInner, 'height')))

      if (_config.scrollbarYRatio > 1 || _config.scrollbarYRatio < 0) {
        return;
      }
      if (config.reverse) {
        _config.scrollbarYInner.style.left = _config.scrollbarYInnerLeft + _config.offsetY + 'px';
      } else {
        _config.scrollbarYInner.style.top = _config.scrollbarYInnerTop +  _config.offsetY + 'px';
      }
      
      _config.scrollContent.style.top = - (parseInt(elementStyle(_config.scrollContent, 'height')) - parseInt(elementStyle(_config.scrollWrap, 'height'))) * _config.scrollbarYRatio + 'px';

    }
    if (elementClass(_config.scrollbarXInner, 'draggable')) {
      //横向滚动条
      _config.offsetX = config.reverse ? (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - _config.startY : (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - _config.startX;
      _config.scrollbarXRatio = config.reverse ?
                              (_config.scrollbarXInnerTop + _config.offsetX) / (parseInt(elementStyle(_config.scrollWrap, 'height')) - parseInt(elementStyle(_config.scrollbarXInner, 'height')))
                              : (_config.scrollbarXInnerLeft + _config.offsetX) / (parseInt(elementStyle(_config.scrollWrap, 'width')) - parseInt(elementStyle(_config.scrollbarXInner, 'width')))

      if (_config.scrollbarXRatio > 1 || _config.scrollbarXRatio < 0) {
        return;
      }
      if (config.reverse) {
        _config.scrollbarXInner.style.top = _config.scrollbarXInnerTop + _config.offsetX + 'px';
      } else {
        _config.scrollbarXInner.style.left = _config.scrollbarXInnerLeft + _config.offsetX + 'px';
      }
      
      _config.scrollContent.style.left = - (parseInt(elementStyle(_config.scrollContent, 'height')) - parseInt(elementStyle(_config.scrollWrap, 'width'))) * _config.scrollbarXRatio + 'px';
    }
  
  };
  /**
   * 拖动停止
   * @param {event} e 
   */
  function stopMoving(e) {
    elementRemoveClass(_config.scrollbarYInner, 'draggable')
    elementRemoveClass(_config.scrollbarXInner, 'draggable')
  }

  //检查点击对象是否在滚动条上
  function checkScrollbarInner(e){
    return e.target === _config.scrollbarYInner || e.target === _config.scrollbarXInner
  }

  //把事件绑定到document，防止拖动出目标对象
  for (let value in _config.scrollEvents) {
    document.addEventListener(value, _config.scrollEvents[value], false)
  }

}

/**
 * 重置计算和设置容器样式
 */
function reset() {
  if (_config.scrollWrap.parentElement === document.body) {
    elementStyle(_config.scrollWrap, 'height', window.innerHeight + 'px');
  }
  var scrollbarYInnerHeight = (parseInt(elementStyle(_config.scrollWrap, 'height')) / parseInt(elementStyle(_config.scrollContent, 'height')));
  var scrollbarXInnerWidth = (parseInt(elementStyle(_config.scrollWrap, 'width')) / parseInt(elementStyle(_config.scrollContent, 'width')))

  elementStyle(_config.scrollbarYInner, _config.reverse ? 'width' : 'height', scrollbarYInnerHeight * 100 + '%');
  elementStyle(_config.scrollbarXInner, _config.reverse ? 'height' : 'width', scrollbarXInnerWidth * 100 + '%');
}

/**
 * 获取配置
 */
function getConfig() {
  return _config;
}
export default { start, getConfig, reset }