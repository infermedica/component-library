export const outline = {
  beforeMount(el) {
    el.__mouseHandler__ = function () {
      el.style.outline = 'none';
    };
    el.__tabHandler__ = function () {
      el.style.outline = '';
      el.focus();
    };
    window.addEventListener('mousedown', el.__mouseHandler__);
    el.addEventListener('keyup', el.__tabHandler__);
  },
  beforeUnmount(el) {
    window.removeEventListener('mousedown', el.__mouseHandler__);
    el.removeEventListener('keyup', el.__tabHandler__);
  },
};
