import {elementStyle, elementClass, elementRemoveClass} from './util';

var modal = (function(){
  var id = 0;
  var modalEle;

  /**
   * 打开弹窗
   * @param {object} config 
   */
  function open(config = {}) {
    var _config = {
      closeByBody: true, //是否点击空白关闭
      className: '', //弹窗内容class
      content: '' //弹窗内容
    };

    var modalId = ++id;
    Object.assign(_config, config);

    //创建弹窗容器
    modalEle = document.createElement('div');
    elementClass(modalEle, 'modal', true);
    if (document.querySelector('.modal')){
      modalEle = document.querySelector('.modal');
    } else {
      modalEle = document.body.appendChild(modalEle)
    }

    //创建弹窗背景
    var modalBackEle = document.createElement('div');
    modalBackEle.id = 'modal-back-' + modalId;
    elementClass(modalBackEle, 'modal-back', true);
    modalBackEle = modalEle.appendChild(modalBackEle);

    _config.closeByBody && modalBackEle.addEventListener('click', function(e){
      close(modalId);
    })
    
    //创建弹窗内容
    var modalContentEle = document.createElement('div');
    modalContentEle.id = 'modal-content-' + modalId;
    elementClass(modalContentEle, 'modal-content', true);
    _config.className && elementClass(modalContentEle, _config.className, true);
    modalContentEle.innerHTML = _config.content;
    modalContentEle = modalEle.appendChild(modalContentEle);

    return modalId;
  }

  /**
   * 关闭弹窗
   * @param {number} id 
   */
  function close(id) {
    if (!id) {
      document.body.removeChild(modalEle);
    }
    var tmpModalBackEle = document.getElementById('modal-back-' + id);
    var tmpModalContentEle = document.getElementById('modal-content-' + id);
    modalEle.removeChild(tmpModalBackEle);
    modalEle.removeChild(tmpModalContentEle);
    
  }
  return {
    open: open,
    close: close
  }
})()

/**
 * 引导方法
 * @param {object} config 
 */
function guide(config = {}) {
  var _config = {
    flag: true, //是否引导
    closeCallback: function(){}, //关闭引导回调
    className: '', //modal的class
    content: ''//引导的html内容
  };
  Object.assign(_config, config);
  if (_config.flag) {
    _config.guideModalId = modal.open({
      className: _config.className,
      content: _config.content
    })
  }  

  return {
    /**
     * 关闭引导
     */
    close: function(){
      _config.closeCallback();
      modal.close(_config.guideModalId)
    }
  }

}

export default guide;