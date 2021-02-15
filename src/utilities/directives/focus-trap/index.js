/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import { nextTick } from 'vue';
import { getFocusableElements, isFocusable, moveFocus } from './helpers';

export const focusTrap = {
  async beforeMount(el) {
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
    await nextTick();
    el.__vueFocusableElements__ = getFocusableElements(el);
  },
  beforeUnmount(el) {
    if (el.__vueLastFocusedElement) {
      el.__vueLastFocusedElement.focus();
    }
    document.removeEventListener('keydown', el.__vueKeyHandler__);
  },
};
