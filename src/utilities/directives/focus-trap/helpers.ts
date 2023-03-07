const isHidden = (selector: HTMLElement) => selector.offsetParent === null;
export const getFocusableElements = (el: HTMLElement) => {
  const focusableElements: string[] = [
    'input:not([tabindex^="-"]):not([disabled])',
    'select:not([tabindex^="-"]):not([disabled])',
    'textarea:not([tabindex^="-"]):not([disabled])',
    'button:not([tabindex^="-"]):not([disabled])',
    'a[href]:not([tabindex^="-"]):not([disabled])',
    '[tabindex]:not([tabindex^="-"]):not([disabled])',
  ];
  return [ ...el.querySelectorAll<HTMLElement>(focusableElements.join(', ')) ]
    .filter((selector) => !isHidden(selector));
};
export const isFocusable = (event: Event, focusableElements: HTMLElement[]) => (
  focusableElements.some((element) => element === event.target));
export const moveFocus = (event: KeyboardEvent, focusableElements: HTMLElement[]) => {
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
