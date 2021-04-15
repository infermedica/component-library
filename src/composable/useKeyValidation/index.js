/**
 * Used to input key validation
 * @param {Object} event - Event object
 * @returns
 * Returns function to prevent from input chars different then numbers
 */
export default function useKeyValidation() {
  function numbersOnly(event) {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1
      || ((event.keyCode === 65 || event.keyCode === 86 || event.keyCode === 67)
      && (event.ctrlKey === true || event.metaKey === true))
      || (event.keyCode >= 35 && event.keyCode <= 40)) {
      return;
    }
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57))
      && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }

  return {
    numbersOnly,
  };
}
