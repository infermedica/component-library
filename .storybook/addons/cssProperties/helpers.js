export const parseScssFile = (scssFile) => scssFile.split('\n').slice(3, -2).reduce((properties, property) => {
  if (!property || !property.includes('--')) return properties;
  const [
    name,
    value,
  ] = property.replace(';', '').split(':');
  return ({
    ...properties,
    [name.trim()]: value.trim(),
  });
}, {});
export const getCssPropertiesList = (cssVars) => Object.keys(cssVars).map((cssVar) => ([
  cssVar,
  cssVars[cssVar],
]));
const getCategory = (cssPropertyName) => {
  const [
    propertyHead,
    propertyTail,
  ] = cssPropertyName.slice(2).split('-');
  if (propertyHead === 'space' || propertyHead === 'focus' || propertyHead === 'opacity') return propertyHead;
  if (propertyTail.match(/h[1-6]/g)) return 'heading';
  return propertyTail;
};
export const getStringifiedStyles = (cssProperties) => Object.keys(cssProperties)
  .reduce((string, property) => `${string} ${property}: ${cssProperties[property]};`, '');
export const getArgsTypes = (cssProperties) => cssProperties.reduce((argsTypes, [
  name,
  value,
]) => ({
  ...argsTypes,
  [name]: {
    name,
    table: {
      category: getCategory(name),
      type: 'CSS Properties',
      defaultValue: { summary: value },
    },
    control: { type: (name.includes('color') || value.includes('color')) ? 'color' : 'text' },
  },
}), {});
export const getArgs = (cssProperties) => cssProperties.reduce((args, [
  name,
  value,
]) => ({
  ...args,
  [name]: value,
}), {});
export const resetLocalStorage = (storyId, key) => {
  window.localStorage.setItem(key, JSON.stringify({
    ...JSON.parse(window.localStorage.getItem(key)),
    [storyId]: {},
  }));
};