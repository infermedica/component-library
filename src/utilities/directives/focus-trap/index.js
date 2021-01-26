/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
import { nextTick } from 'vue';
import { getFocusableElements, isFocusable, moveFocus } from './helpers';

export const focusTrap = {
  async beforeMount(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeMount: v-focus-trap', el);
    }
    await nextTick();
    el.__vueFocusableElements__ = getFocusableElements(el);
    el.__vueKeyHandler__ = function (event) {
      if (event.key === 'Tab') {
        if (!isFocusable(event, el.__vueFocusableElements__)) {
          el.__vueLastFocusedElement = event.target;
        }
      }
      moveFocus(event, el.__vueFocusableElements__);
    };
    document.addEventListener('keydown', el.__vueKeyHandler__);
  },
  async update(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('update: v-focus-trap', el);
    }
    await nextTick();
    el.__vueFocusableElements__ = getFocusableElements(el);
  },
  beforeUnmount(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeUnmount: v-focus-trap', el);
    }
    if (el.__vueLastFocusedElement) {
      el.__vueLastFocusedElement.focus();
      document.removeEventListener('keydown', el.__vueKeyHandler__);
    }
  },
};
