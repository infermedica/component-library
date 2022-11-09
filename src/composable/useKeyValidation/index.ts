export default function useKeyValidation() {
  function numbersOnly(event: KeyboardEvent) {
    const { key } = event;
    if (key && !/\d/.test(key) && key.length === 1) {
      event.preventDefault();
    }
  }
  return { numbersOnly };
}
