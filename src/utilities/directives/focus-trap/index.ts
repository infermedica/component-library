/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import { nextTick } from 'vue';
import type {
  Directive,
  DirectiveBinding,
} from 'vue';
import { focusElement } from '../../helpers';
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
  async beforeMount(el, binding: DirectiveBinding) {
    await nextTick();
    el.__vueFocusableElements__ = getFocusableElements(el);

    const options = binding.value || {};
    const { autoFocus = true } = options;

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

    if (!autoFocus) return;
    // NOTE: Finds all focusable elements within the element, then sets focus on the first one if any are found
    const focusableElements = el.__vueFocusableElements__;

    if (focusableElements.length > 0) focusElement(focusableElements[0], true);
  },
  beforeUnmount(el) {
    if (el.__vueLastFocusedElement__) {
      el.__vueLastFocusedElement__.focus();
    }
    document.removeEventListener('keydown', el.__vueKeyHandler__);
    el.__observer__.disconnect();
  },
};
