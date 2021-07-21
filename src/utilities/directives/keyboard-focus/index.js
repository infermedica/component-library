/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
export const keyboardFocus = {
  beforeMount(el) {
    el.__vueMouseHandler__ = function () {
      document.body.style.setProperty('--box-shadow-outline', 'none');
    };
    el.__vueKeyHandler__ = function (event) {
      document.body.style.removeProperty('--box-shadow-outline');
      if (event.code === 'Tab') {
        el.focus();
      }
    };
    window.addEventListener('mousedown', el.__vueMouseHandler__);
    el.addEventListener('keyup', el.__vueKeyHandler__);
    el.addEventListener('focus', () => {
      document.body.style.setProperty('--box-shadow-outline', 'none');
    });
  },
  beforeUnmount(el) {
    window.removeEventListener('mousedown', el.__vueMouseHandler__);
    el.removeEventListener('keyup', el.__vueKeyHandler__);
  },
};
