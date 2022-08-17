/* eslint-disable import/prefer-default-export */
export const focusElement = (el, focusVisible = false) => {
  if (el) {
    if (focusVisible) {
      document.body.classList.remove('focus-hidden');
    }
    return new Promise((resolve) => setTimeout(() => {
      el.focus();
      resolve();
    }, 0));
  }
};
