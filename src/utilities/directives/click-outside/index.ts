/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
import type { Directive } from 'vue';

interface ElementClickOutside extends HTMLElement {
  '__vueClickOutsideHandler__': (event: Event) => void
}

const isDisabled = (isActive?: string | boolean) => isActive !== undefined && (isActive === 'false' || isActive === false);

export const clickOutside: Directive<ElementClickOutside, (event: Event) => void> = {
  beforeMount(el, binding) {
    el.__vueClickOutsideHandler__ = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!el.contains(target) && el !== target) {
        binding.value(event);
      }
    };
    if (isDisabled(binding.arg)) return;
    document.addEventListener('click', el.__vueClickOutsideHandler__, true);
  },
  updated(el, binding) {
    if (isDisabled(binding.arg)) {
      document.removeEventListener('click', el.__vueClickOutsideHandler__, true);
    } else {
      document.addEventListener('click', el.__vueClickOutsideHandler__, true);
    }
  },
  beforeUnmount(el, binding) {
    if (isDisabled(binding.arg)) return;
    document.removeEventListener('click', el.__vueClickOutsideHandler__, true);
  },
};
