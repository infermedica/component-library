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
