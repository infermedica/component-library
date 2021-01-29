/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
export const test = {
  beforeMount(el, binding) {
    if (!process.env.NODE_ENV.production) {
      el.setAttribute('data-testid', binding.value);
    }
  },
  beforeUnmount(el) {
    if (!process.env.NODE_ENV.production) {
      el.removeAttribute('data-testid');
    }
  },
};
