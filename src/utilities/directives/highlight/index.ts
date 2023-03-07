/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import type {
  Directive,
  DirectiveBinding,
} from 'vue';

interface ElementHighlight extends HTMLElement {
  '__highlightHandler__': (element: ElementHighlight, binding: DirectiveBinding<string>) => void;
}

export const highlight: Directive<ElementHighlight, string> = {
  beforeMount(el, binding) {
    el.__highlightHandler__ = (element, { value }) => {
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
