/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
function isDisabled({
  arg,
}) {
  return arg !== undefined && arg === false;
}

export const clickOutside = {
  beforeMount(el, binding) {
    el.__vueClickOutsideHandler = (event) => {
      const {
        target,
      } = event;
      if (!el.contains(target) && el !== target) {
        binding.value(event);
      }
    };
    if (isDisabled(binding)) return;
    document.addEventListener('click', el.__vueClickOutsideHandler, true);
  },
  updated(el, binding) {
    if (isDisabled(binding)) {
      document.removeEventListener('click', el.__vueClickOutsideHandler, true);
    } else {
      document.addEventListener('click', el.__vueClickOutsideHandler, true);
    }
  },
  beforeUnmount(el, binding) {
    if (isDisabled(binding)) return;
    document.removeEventListener('click', el.__vueClickOutsideHandler, true);
  },
};
