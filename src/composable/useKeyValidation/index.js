/**
 * Used to input key validation
 * @param {Object} event - Event object
 * @returns
 * Returns function to prevent from input chars different then numbers
 */
export default function useKeyValidation() {
  function numbersOnly(event) {
    const { key } = event;
    if (!/\d/.test(key) && key.length === 1) {
      event.preventDefault();
    }
  }

  return {
    numbersOnly,
  };
}
