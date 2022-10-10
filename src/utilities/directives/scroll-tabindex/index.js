/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import { nextTick } from 'vue';

export const scrollTabindex = {
  async beforeMount(el) {
    await nextTick();
    el.__vueResizeHandler__ = function () {
      const {
        clientHeight, scrollHeight,
      } = el;
      if (scrollHeight > clientHeight) {
        if (!el.getAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
        }
      } else if (el.getAttribute('tabindex')) {
        el.removeAttribute('tabindex');
      }
    };
    el.__observer__ = new MutationObserver(el.__vueResizeHandler__);
    el.__observer__.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    el.__vueResizeHandler__();
    window.addEventListener('resize', el.__vueResizeHandler__);
  },
  beforeUnmount(el) {
    window.removeEventListener('resize', el.__vueResizeHandler__);
    el.__observer__.disconnect();
  },
};
