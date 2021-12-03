/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
function isDisabled({ arg }) {
  return arg !== undefined && arg === false;
}

export const clickOutside = {
  beforeMount(el, binding) {
    if (isDisabled(binding)) return;
    el.__vueClickOutsideHandler__ = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.__vueClickOutsideHandler__);
  },
  beforeUnmount(el, binding) {
    if (isDisabled(binding)) return;
    document.removeEventListener('click', el.__vueClickOutsideHandler__);
  },
};
