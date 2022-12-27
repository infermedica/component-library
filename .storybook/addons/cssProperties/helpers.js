export const getRows = (cssProperties) => cssProperties.reduce((argsTypes, [
  name,
  value,
]) => ({
  ...argsTypes,
    [name]: {
      name,
      section: getCategory(name),
      defaultValue: value,
      value: value,
      type: getControlType(name, value),
    },
}), {});
const getCategory = (cssPropertyName) => {
  const [
    propertyHead,
    propertyTail,
  ] = cssPropertyName.slice(2).split('-');
  if (propertyHead === 'space' || propertyHead === 'focus' || propertyHead === 'opacity') return propertyHead;
  if (propertyTail.match(/h[1-6]/g)) return 'heading';
  return propertyTail;
};
const getControlType = (cssPropertyName, cssPropertyValue) => (
  cssPropertyName.includes('color') || cssPropertyValue.includes('color')
    ? 'color'
    : 'text'
);
export const getCssProperties = (cssProperties) => (
  Object.keys(cssProperties).map((cssProperty) => ([
    cssProperty,
    cssProperties[cssProperty],
  ]))
);
export const getStringifiedStyles = (cssProperties) => Object.keys(cssProperties)
  .reduce((stylesString, cssProperty) => `${stylesString} ${cssProperty}: ${cssProperties[cssProperty]};`, '');
export const parseScssFile = (scssFile) => scssFile.split('\n')
  .slice(3, -2)
  .reduce((cssProperties, cssProperty) => {
    if (!cssProperty || !cssProperty.includes('--')) return cssProperties;
    const [
      name,
      value,
    ] = cssProperty.replace(';', '').split(':');
    return ({
      ...cssProperties,
      [name.trim()]: value.trim(),
    });
  }, {});
