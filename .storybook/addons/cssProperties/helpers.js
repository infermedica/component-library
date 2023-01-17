import { addons } from '@storybook/addons';
import { getStorageValue, getStorageCssVarValue } from './hooks/useLocalStorage';

export const getRows = (cssProperties, storyId) => cssProperties.reduce((argsTypes, [
  name,
  value,
]) => ({
  ...argsTypes,
    [name]: {
      name,
      section: getCategory(name),
      defaultValue: value,
      value: getStorageValue(storyId)?.[name] || value,
      type: getControlType(name, value),
    },
}), {});
const getCategory = (cssPropertyName) => {
  const storyName = addons.getChannel().data.currentStoryWasSet[0].storyId.split('-')[1]
  const [
    propertyHead,
    ...propertyTail
  ] = cssPropertyName.slice(2).split('-');
  if (propertyHead === 'space' || propertyHead === 'focus' || propertyHead === 'opacity') return propertyHead;
  if (propertyTail[0].match(/h[1-6]/g)) return 'heading';
  const index = storyName === `${propertyHead}${propertyTail[0]}` ? 1 : 0
  const category = ['max', 'box'].includes(propertyTail[index])
    ? `${propertyTail[index]}-${propertyTail[index + 1]}`
    : `${propertyTail[index]}`
  return category
};
const getControlType = (cssPropertyName, cssPropertyValue) => (
  ( cssPropertyName.includes('color')
  || cssPropertyName.includes('background'))
  && !cssPropertyValue.includes(' ')
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
  .slice(2, -2)
  .reduce((cssProperties, cssProperty) => {
    if (!cssProperty || !cssProperty.includes('--')) return cssProperties;
    const [
      name,
      value,
    ] = cssProperty.replace(';', '').split(':');
    if(cssProperties[name.trim()]) return cssProperties;
    return ({
      ...cssProperties,
      [name.trim()]: value.trim(),
    });
  }, {});
export const getDocument = () => {
  const iframe = document.querySelector("#storybook-preview-iframe");
  if (iframe) {
    return iframe.contentWindow.document;
  }
  return document;
};
export const removeBodyStyles = () => {
  getDocument().body.removeAttribute("style");
};
export const getBackgroundColor = (cssVar, defaultValue) => {
  if (cssVar.includes('icon-negative')) {
    return getStorageCssVarValue('--color-triage-emergency');
  }
  if (cssVar.includes('chip')) return getStorageCssVarValue('--color-chip-background');
  const isWithBackground = cssVar.includes('-on');
  if ((defaultValue === 'var(--color-white)' && !isWithBackground) || cssVar.includes('-on-brand')) {
    return getStorageCssVarValue('--color-background-brand');
  }
  if (isWithBackground) {
    const type = cssVar.includes('icon') ? 'icon' : 'text';
    return getStorageCssVarValue(cssVar.replace(type, 'background').replace('-on-', '-'));
  }
  return 'white';
}