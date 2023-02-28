/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
import type { Directive } from 'vue';

interface ElementClickOutside extends HTMLElement {
  '__vueClickOutsideHandler__': (event: Event) => void
}
export interface VClickOutsideOptions {
  handler: (event: Event) => void;
  isActive?: boolean;
}

const isDisabled = (isActive: boolean | undefined) => isActive !== undefined && isActive === false;

export const clickOutside: Directive<ElementClickOutside, VClickOutsideOptions> = {
  beforeMount(el, binding) {
    el.__vueClickOutsideHandler__ = (event) => {
      const target = event.target as HTMLElement;
      if (!el.contains(target) && el !== target) {
        binding.value.handler(event);
      }
    };
    if (isDisabled(binding.value.isActive)) return;
    document.addEventListener('click', el.__vueClickOutsideHandler__, true);
  },
  updated(el, binding) {
    if (isDisabled(binding.value.isActive)) {
      document.removeEventListener('click', el.__vueClickOutsideHandler__, true);
    } else {
      document.addEventListener('click', el.__vueClickOutsideHandler__, true);
    }
  },
  beforeUnmount(el, binding) {
    if (isDisabled(binding.value.isActive)) return;
    document.removeEventListener('click', el.__vueClickOutsideHandler__, true);
  },
};
