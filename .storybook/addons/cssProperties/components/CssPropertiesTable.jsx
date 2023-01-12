import React, { useMemo } from 'react';
import { ArgsTable } from '@storybook/components';
import { useInjectStyles } from '../hooks/useInjectStyles'
import { useWindowEvent } from '../hooks/useWindowEvents'
import {
  useLocalStorage,
  getStorageGlobalProperties,
  setStorageGlobalProperties,
} from '../hooks/useLocalStorage'
import {
  getArgs,
  getArgsTypes,
  getCssProperties,
  parseScssFile,
} from '../helpers'

const CssPropertiesTable = ({
  storyId = "global", data = {}, inAddonPanel = false,
}) => {
  const defaultCssProperties = getCssProperties(inAddonPanel ? data : parseScssFile(data));
  const globalCssProperties = getStorageGlobalProperties();
  const [ cssLocalProperties, setCssLocalProperties, resetCssLocalProperties] = useLocalStorage(storyId);
  const rows = getArgsTypes(defaultCssProperties);
  useWindowEvent('storage', (event) => setStorageGlobalProperties(event, globalCssProperties));
  useInjectStyles({
    ...globalCssProperties.current,
    ...cssLocalProperties
  });
  const [ args ] = useMemo(() => ([{
    ...getArgs(defaultCssProperties),
    ...globalCssProperties.current,
    ...cssLocalProperties,
  }]));
  const handleUpdateArgs = (arg) => {
    setCssLocalProperties((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };
  const resetArgs = () => {
    resetCssLocalProperties();
    window.location.reload();
  };
  return (
    <ArgsTable
      inAddonPanel={inAddonPanel}
      resetArgs={resetArgs}
      args={args}
      rows={rows}
      updateArgs={handleUpdateArgs}
    />
  );
};
export default CssPropertiesTable;
