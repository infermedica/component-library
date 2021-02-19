/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, no-shadow, consistent-return */
import { nextTick } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const bodyScrollLock = {
  async beforeMount(el) {
    await nextTick();
    disableBodyScroll(el, {
      allowTouchMove: (el) => {
        while (el && el !== document.body) {
          if (el.getAttribute('body-scroll-lock-ignore') !== null) {
            return true;
          }

          el = el.parentElement;
        }
      },
    });
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount(el) {
    enableBodyScroll(el);
    document.body.style.overflow = '';
  },
};
