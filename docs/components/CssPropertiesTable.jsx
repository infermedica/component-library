import * as React from 'react';
import { ArgsTable } from '@storybook/components';

const parseScssFile = (scssFile) => scssFile.split('\n').slice(3, -2).reduce((properties, property) => {
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
const getCssPropertiesList = (cssVars) => Object.keys(cssVars).map((cssVar) => ([
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
const getArgsTypes = (cssProperties) => cssProperties.reduce((argsTypes, [
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
const getArgs = (cssProperties) => cssProperties.reduce((args, [
  name,
  value,
]) => ({
  ...args,
  [name]: value,
}), {});
const useInjectStyles = (cssLocalProperties = {}) => {
  const cssGlobalProperties = JSON.parse(window.localStorage.getItem('cssPropertiesGlobal'));
  const styles = {
    ...cssGlobalProperties,
    ...cssLocalProperties,
  };
  const getStringifiedStyles = () => Object.keys(styles)
    .reduce((string, property) => `${string} ${property}: ${styles[property]};`, '');
  const previewRef = React.useRef();
  React.useLayoutEffect(() => {
    const iframe = document.querySelector(
      '#storybook-preview-iframe',
    );
    if (iframe) {
      previewRef.current = iframe?.contentWindow?.document;
    } else if (document) {
      previewRef.current = document;
    }
  }, [ styles ]);
  React.useLayoutEffect(() => {
    const stringifiedStyles = getStringifiedStyles();
    if (stringifiedStyles) {
      previewRef?.current?.body?.setAttribute('style', stringifiedStyles);
    }
    return () => {
      previewRef?.current?.body?.removeAttribute('style');
    };
  }, [ styles ]);
};

const CssPropertiesTable = ({
  data = {}, inAddonPanel = false,
}) => {
  console.log('start');
  const isLocal = inAddonPanel ? 'cssPropertiesLocal' : 'cssPropertiesGlobal';
  const cssGlobal = JSON.parse(window.localStorage.getItem('cssPropertiesGlobal'));
  const cssPropertiesList = getCssPropertiesList(inAddonPanel ? data : parseScssFile(data));
  const [
    args,
    setArgs,
  ] = React.useState({
    ...getArgs(cssPropertiesList),
    ...cssGlobal,
  });
  const [
    changes,
    setChanges,
  ] = React.useState({});
  const handleUpdateArgs = (arg) => {
    setArgs({
      ...args,
      ...arg,
    });
    setChanges({
      ...changes,
      ...arg,
    });
    const value = JSON.parse(window.localStorage.getItem(isLocal));
    window.localStorage.setItem(isLocal, JSON.stringify({
      ...value,
      ...changes,
    }));
  };
  const resetArgs = () => {
    setArgs(getArgs(cssPropertiesList));
    window.localStorage.removeItem(isLocal);
    window.location.reload();
  };
  useInjectStyles(args);
  return (
    <ArgsTable
      inAddonPanel={inAddonPanel}
      resetArgs={() => resetArgs()}
      args={args}
      rows={getArgsTypes(cssPropertiesList)}
      updateArgs={handleUpdateArgs}
    />
  );
};

export default CssPropertiesTable;
