/**
 * Used to distinguish attributes for input and its root element
 * @param {Object} attrs - Vue Component $attrs desctructured from context, { $args }
 * @returns
 * Returns two helper functions to get root and input attributes
 */
export default function useInput() {
  function getInputAttrs(attrs) {
    return Object.keys(attrs)
      .filter((key) => !key.match(/class|style|^on.*/gi))
      .reduce((obj, key) => (
        { ...obj, [key]: attrs[key] }
      ), {});
  }
  function getRootAttrs(attrs) {
    return Object.keys(attrs)
      .filter((key) => key.match(/class|style|^on.*/gi))
      .reduce((obj, key) => (
        { ...obj, [key]: attrs[key] }
      ), {});
  }

  return {
    getRootAttrs,
    getInputAttrs,
  };
}
