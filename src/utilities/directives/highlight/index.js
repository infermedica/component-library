/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign */
export const highlight = {
  beforeMount(el, binding) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeMount: v-highlight', el);
    }
    el.__highlightHandler__ = function (element) {
      const query = binding.value;
      const content = element.innerHTML.replace(/<\/?mark>/gi, '');
      const marked = content.replace(
        new RegExp(query, 'gi'),
        (match) => `<mark>${match}</mark>`,
      );
      element.innerHTML = marked;
    };
    el.__highlightHandler__(el, binding);
  },
  updated(el, binding) {
    if (!process.env.NODE_ENV.production) {
      console.warn('update: v-highlight', el);
    }
    el.__highlightHandler__(el, binding);
  },
  beforeUnmount(el, binding) {
    if (!process.env.NODE_ENV.production) {
      console.warn('beforeUnmount: v-highlight', el);
    }
    el.__highlightHandler__(el, binding);
  },
};
