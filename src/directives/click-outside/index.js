export const clickOutside = {
  bind(el, binding) {
    const handler = binding.value;
    el._outsideClickHandler = function (event) {
      if (!el.contains(event.target)) {
        event.stopPropagation();
        handler();
      }
    };
    document.addEventListener('mouseup', el._outsideClickHandler);
    document.addEventListener('touchend', el._outsideClickHandler);
  },
  unbind(el) {
    document.removeEventListener('mouseup', el._outsideClickHandler);
    document.removeEventListener('touchend', el._outsideClickHandler);
  },
};
