/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, no-shadow, consistent-return */
import { nextTick } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const bodyScrollLock = {
  async beforeMount(el) {
    // Prevent body scroll when modal is open in Storybook
    if (window.__STORYBOOK_ADDONS) return;
    await nextTick();
    disableBodyScroll(el, {
      allowTouchMove: (el) => {
        while (el && el !== document.body) {
          if (el.getAttribute('body-scroll-lock-ignore') !== 'false') {
            return true;
          }
          el = el.parentElement;
        }
      },
    });
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount(el) {
    // Prevent body scroll when modal is open in Storybook
    if (window.__STORYBOOK_ADDONS) return;
    enableBodyScroll(el);
    document.body.style.overflow = '';
  },
};
