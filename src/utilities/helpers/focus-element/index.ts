/* eslint-disable import/prefer-default-export */
export const focusElement = (el: HTMLElement, focusVisible = false): Promise<void> => {
  if (el) {
    if (focusVisible) {
      document.body.classList.remove('focus-hidden');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        el.focus();
        resolve();
      }, 0);
    });
  }
  return new Promise((resolve) => {
    resolve();
  });
};
