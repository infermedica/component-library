/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
export const focusElement = (el: HTMLElement, focusVisible = false) => {
  if (el) {
    if (focusVisible) {
      document.body.classList.remove('focus-hidden');
    }
    return new Promise((resolve: (value?: unknown) => void) => {
      setTimeout(() => {
        el.focus();
        resolve();
      }, 0);
    });
  }
};
