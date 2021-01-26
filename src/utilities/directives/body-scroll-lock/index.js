/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
import { nextTick } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const bodyScrollLock = {
  async beforeMount(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeMount: v-body-scroll-lock', el);
    }
    await nextTick();
    disableBodyScroll(el);
  },
  beforeUnmount(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeUnmount: v-body-scroll-lock', el);
    }
    enableBodyScroll(el);
  },
};
