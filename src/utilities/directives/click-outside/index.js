/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
export const clickOutside = {
  beforeMount(el, binding) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeMount: v-click-outside', el);
    }
    el.__vueClickOutsideHandler__ = (event) => {
      if (!process.env.NODE_ENV.production) {
        console.warn('click: v-click-outside', el);
      }
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.__vueClickOutsideHandler__);
  },
  beforeUnmount(el) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeUnmount: v-click-outside', el);
    }
    document.removeEventListener('click', el.__vueClickOutsideHandler__);
  },
};
