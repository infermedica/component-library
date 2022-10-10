const isHidden = (selector) => (selector.offsetParent === null);
export const getFocusableElements = (el) => {
  const focusableElements = [
    'a[href]:not([disabled])',
    'button:not([disabled])',
    'button:not([hidden])',
    '[tabindex]:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
  ];
  return [ ...el.querySelectorAll(focusableElements) ]
    .filter((selector) => !isHidden(selector));
};
export const isFocusable = (event, focusableElements) => (
  [ ...focusableElements ]
    .some((element) => element === event.target));
export const moveFocus = (event, focusableElements) => {
  if (!focusableElements.length || event.key !== 'Tab') return;
  if (!isFocusable(event, focusableElements)) {
    event.preventDefault();
    focusableElements[0].focus();
  }
  if (focusableElements.length === 1) {
    event.preventDefault();
  }
  const lastElementIndex = focusableElements.length - 1;
  const isLastElement = (event.target === focusableElements[lastElementIndex]);
  const isFirstElement = (event.target === focusableElements[0]);
  const isGoingForward = (event.shiftKey === false);

  if (isGoingForward && isLastElement) {
    event.preventDefault();
    focusableElements[0].focus();
  } else if (!isGoingForward && isFirstElement) {
    event.preventDefault();
    focusableElements[lastElementIndex].focus();
  }
};
