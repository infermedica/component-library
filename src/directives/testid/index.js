export const test = {
  bind(el, binding) {
    if (process.env.NODE_ENV !== 'development') return;
    el.setAttribute('data-testid', binding.value);
  },
  unbind(el) {
    if (process.env.NODE_ENV !== 'development') return;
    el.removeAttribute('data-testid');
  },
};
