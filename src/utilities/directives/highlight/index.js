/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
export const highlight = {
  beforeMount(el, binding) {
    el.__highlightHandler__ = function (element, {
      value,
    }) {
      const content = element.innerHTML.replace(/<\/?mark>/gi, '');
      const marked = content.replace(
        new RegExp(value.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'gi'),
        (match) => (match && `<mark>${match}</mark>`),
      );
      element.innerHTML = marked;
    };
    el.__highlightHandler__(el, binding);
  },
  updated(el, binding) {
    el.__highlightHandler__(el, binding);
  },
  beforeUnmount(el, binding) {
    el.__highlightHandler__(el, binding);
  },
};
