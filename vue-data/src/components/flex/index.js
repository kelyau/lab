import Vue from 'vue';
/* eslint-disable */
export const flexContinaer = Vue.directive('flex-container', {
  bind(el,binding, vnode) {
    el.style.display = 'flex';
    el.style.height = '100%';

    if (!vnode.data.attrs){
      return;
    }

    if (vnode.data.attrs.valign) {
      el.style['justify-content'] = vnode.data.attrs.valign;
    }
    if (vnode.data.attrs.align) {
      el.style['align-items'] = vnode.data.attrs.align;
    }
    if (vnode.data.attrs.direction) {
      el.style['flex-direction'] = vnode.data.attrs.direction;
    }
  },
});

export const flexItem = Vue.directive('flex-item', {
  bind(el, binding, vnode) {
    if (!vnode.data.attrs){
      el.style.flex = 1;
      return;
    }
    if (vnode.data.attrs.width){
      if (/\d$/g.test(vnode.data.attrs.width)) {
        el.style.flex = vnode.data.attrs.width
      }else{
        el.style.width = vnode.data.attrs.width
      }
    }else{
       el.style.flex = 1;
    }
    
  },
});
