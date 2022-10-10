const attrsRegex = /class|style|^on(?!Blur$|Focus$).*/gi;

export default function useInput() {
  function getInputAttrs(attrs) {
    return Object.keys(attrs)
      .filter((key) => (!key.match(attrsRegex)))
      .reduce((object, key) => (
        {
          ...object,
          [key]: attrs[key],
        }
      ), {});
  }

  function getRootAttrs(attrs) {
    return Object.keys(attrs)
      .filter((key) => (key.match(attrsRegex)))
      .reduce((object, key) => (
        {
          ...object,
          [key]: attrs[key],
        }
      ), {});
  }

  return {
    getInputAttrs,
    getRootAttrs,
  };
}
