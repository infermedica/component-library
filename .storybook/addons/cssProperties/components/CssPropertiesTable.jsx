import * as React from 'react';
import { ArgsTable } from '@storybook/components';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx'
import { useWindowEvent } from '../hooks/useWindowEvents'
import {
  getArgs,
  getArgsTypes,
  getCssPropertiesList,
  getStringifiedStyles,
  parseScssFile,
} from '../helpers'

const CssPropertiesTable = ({
  active = true, storyId = "global", data = {}, inAddonPanel = false,
}) => {
  const cssPropertiesList = getCssPropertiesList(inAddonPanel ? data : parseScssFile(data));
  const cssGlobalProperties = React.useRef(window.localStorage.getItem('cssProperties') ? JSON.parse(window.localStorage.getItem('cssProperties'))['global']: {})
  const updateGlobalStorage = (event) => {
    if (event.storageArea === window.localStorage && event.key === 'cssProperties') {
      cssGlobalProperties.current = JSON.parse(event.newValue)['global'];
    }
  }
  const [changes, setChanges, resetChanges] = useLocalStorage(storyId);
  const [ args ] = React.useMemo(() => ([{
    ...getArgs(cssPropertiesList),
    ...cssGlobalProperties.current,
    ...changes,
  }]));
  const handleUpdateArgs = (arg) => {
    setChanges((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };
  // hooks
  useWindowEvent('storage', updateGlobalStorage);
  const previewRef = React.useRef();
  React.useLayoutEffect(() => {
    const iframe = document.querySelector(
      "#storybook-preview-iframe"
    );
    if (iframe) {
      previewRef.current = iframe?.contentWindow?.document;
    } else if (document) {
      previewRef.current = document;
    }
  });

  React.useLayoutEffect(() => {
    const stringifiedStyles = getStringifiedStyles({...cssGlobalProperties.current, ...changes});
    if (stringifiedStyles) {
      previewRef?.current?.body?.setAttribute("style", stringifiedStyles);
    }
  });

  // events
  const resetArgs = () => {
    resetChanges();
    window.location.reload();
  };
  return (
    <ArgsTable
      inAddonPanel={inAddonPanel}
      resetArgs={resetArgs}
      args={args}
      rows={getArgsTypes(cssPropertiesList)}
      updateArgs={handleUpdateArgs}
    />
  );
};

export default CssPropertiesTable;
