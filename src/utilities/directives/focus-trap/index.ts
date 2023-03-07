/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import { nextTick } from 'vue';
import type { Directive } from 'vue';
import {
  getFocusableElements,
  isFocusable,
  moveFocus,
} from './helpers';

export interface ElementFocusTrap extends HTMLElement {
  '__vueKeyHandler__': (event: KeyboardEvent) => void;
  '__vueFocusableElements__': HTMLElement[];
  '__vueLastFocusedElement__': HTMLElement;
  '__observer__': MutationObserver;
}

export const focusTrap: Directive<ElementFocusTrap> = {
  async beforeMount(el) {
    await nextTick();
    el.__vueFocusableElements__ = getFocusableElements(el);
    el.__vueKeyHandler__ = (event) => {
      if (event.key === 'Tab') {
        if (!isFocusable(event, el.__vueFocusableElements__)) {
          el.__vueLastFocusedElement__ = event.target as HTMLElement;
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
    if (el.__vueLastFocusedElement__) {
      el.__vueLastFocusedElement__.focus();
    }
    document.removeEventListener('keydown', el.__vueKeyHandler__);
    el.__observer__.disconnect();
  },
};
