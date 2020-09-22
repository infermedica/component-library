export const outline = {
  bind(el) {
    el._mouseHandler = function () {
      el.style.outline = 'none';
    };
    el._tabHandler = function () {
      el.style.outline = '';
      el.focus();
    };
    window.addEventListener('mousedown', el._mouseHandler);
    el.addEventListener('keyup', el._tabHandler);
  },
  unbind(el) {
    window.removeEventListener('mousedown', el._mouseHandler);
    el.removeEventListener('keyup', el._tabHandler);
  },
};
