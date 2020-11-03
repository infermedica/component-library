export const test = {
  beforeMount(el, binding) {
    if (process.env.NODE_ENV !== 'development') return;
    el.setAttribute('data-testid', binding.value);
  },
  beforeUnmount(el) {
    if (process.env.NODE_ENV !== 'development') return;
    el.removeAttribute('data-testid');
  },
};
