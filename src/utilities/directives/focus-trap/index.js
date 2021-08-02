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
    el.__observer__ = new MutationObserver(() => {
      el.__vueFocusableElements__ = getFocusableElements(el);
    });
    el.__observer__.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    document.addEventListener('keydown', el.__vueKeyHandler__);
  },
  beforeUnmount(el) {
    if (el.__vueLastFocusedElement) {
      el.__vueLastFocusedElement.focus();
    }
    document.removeEventListener('keydown', el.__vueKeyHandler__);
    el.__observer__.disconnect();
  },
};
