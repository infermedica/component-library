/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import type { Directive } from 'vue';

interface ElementKeyboardFocus extends HTMLElement {
  '__vueMouseHandler__': () => void;
  '__vueKeyHandler__': (event: KeyboardEvent) => void;
}

export const keyboardFocus: Directive<ElementKeyboardFocus> = {
  beforeMount(el) {
    el.__vueMouseHandler__ = () => {
      document.body.classList.add('focus-hidden');
    };
    el.__vueKeyHandler__ = (event) => {
      if (event.code === 'Tab') {
        document.body.classList.remove('focus-hidden');
        el.focus();
      }
    };
    window.addEventListener('mousedown', el.__vueMouseHandler__);
    el.addEventListener('keyup', el.__vueKeyHandler__);
  },
  beforeUnmount(el) {
    window.removeEventListener('mousedown', el.__vueMouseHandler__);
    el.removeEventListener('keyup', el.__vueKeyHandler__);
  },
};
