/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
function isDisabled({ arg }) {
  return arg !== undefined && arg === false;
}

export const clickOutside = {
  beforeMount(el, binding) {
    if (isDisabled(binding)) return;
    el.__vueClickOutsideHandler = (event) => {
      const { target } = event;
      if (!el.contains(target) && el !== target) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.__vueClickOutsideHandler);
  },
  beforeUnmount(el, binding) {
    if (isDisabled(binding)) return;
    document.removeEventListener('click', el.__vueClickOutsideHandler);
  },
};
