/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
import { nextTick } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const bodyScrollLock = {
  async beforeMount(el) {
    await nextTick();
    disableBodyScroll(el);
  },
  beforeUnmount(el) {
    enableBodyScroll(el);
  },
};
