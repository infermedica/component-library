/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
export const keyboardFocus = {
  beforeMount(el) {
    el.__vueMouseHandler__ = function () {
      document.body.classList.add('focus-hidden');
    };
    el.__vueKeyHandler__ = function (event) {
      if (event.code === 'Tab') {
        document.body.classList.remove('focus-hidden');
        el.focus();
      }
    };
    window.addEventListener('mousedown', el.__vueMouseHandler__);
    el.addEventListener('keyup', el.__vueKeyHandler__);
  },
  beforeUnmount(el) {
    window.removeEventListener('mousedown', el.__vueMouseHandler__);
    el.removeEventListener('keyup', el.__vueKeyHandler__);
  },
};
