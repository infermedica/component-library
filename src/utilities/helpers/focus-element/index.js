/* eslint-disable import/prefer-default-export */
export const focusElement = (el, focusVisible = false) => {
  if (el) {
    if (focusVisible) {
      document.body.classList.remove('focus-hidden');
    }
    el.focus();
  }
};
