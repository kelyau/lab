/**
 * 设置样式
 * @param {element} target 
 * @param {string||object} key 
 * @param {string} value 
 */
export function elementStyle(target, key, value){
  if (!target || !key) {
    return;
  }
  if (typeof key === 'object'){
    for (let p in key) {
      if (key.hasOwnProperty(p)){
        target.style[p] = key[p]
      }
    }
    return;
  }
  if (!value){
    var finalStyle;
    if (window.getComputedStyle){
     finalStyle = window.getComputedStyle(target)[key];
    }
    return finalStyle
  }
  target.style[key] = value;
}

/**
 * 设置class/获取是否包含class
 * @param {element} target 
 * @param {string} key 
 * @param {boolean} flag 
 */
export function elementClass(target, key, flag) {
  if (!target || !key) {
    return;
  }
  if (!flag) {
    return target.className.indexOf(key) > -1
  }
  if (target.className.indexOf(key) > -1) {
    return;
  }
  target.className = target.className + ' ' + key;
}

/**
 * 删除class
 * @param {element} target 
 * @param {string} key 
 */
export function elementRemoveClass(target, key) {
  target.className = target.className.replace((' ' + key), '');
}