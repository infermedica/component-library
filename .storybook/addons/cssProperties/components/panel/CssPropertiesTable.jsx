import React, { useState, useRef, useMemo, createContext, useEffect } from 'react';
import { useAddonState } from '@storybook/api';
import { IconButton, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Table } from '../../../../../docs/components/Table';
import { TableExpandableRows } from './internals/TableExpandableRows';
import { useWindowEvent } from '../../hooks/useWindowEvents';
import { useInjectStyles } from '../../hooks/useInjectStyles';
import {
  useLocalStorage,
  getStorageGlobalProperties,
  setStorageGlobalProperties,
} from '../../hooks/useLocalStorage';
import {
  getRows,
  getCssProperties,
  parseScssFile,
} from '../../helpers';

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ResetButton = styled(IconButton)`
  height: 20px;
  margin: 0;
  padding: 3px 8px;
  border: 1px solid #D2DAE2;
  border-radius: 3em;
  background-color: #F6F9FC;
  color: #30ABFD;
`;

export const KeyColorPickerContext = createContext(0);

export const CssPropertiesTable = ({
  storyId = "global", data = {}, hasExampleColumn = true, inAddon = false,
}) => {
  const defaultCssProperties = getCssProperties(inAddon ? data : parseScssFile(data));
  const globalCssProperties = getStorageGlobalProperties();
  const [
    cssLocalProperties,
    setCssLocalProperties,
    resetCssLocalProperties
  ] = useLocalStorage(storyId);
  const [rows, setRows] = useAddonState('CssPropertiesState', getRows(defaultCssProperties, storyId));
  useEffect(() => {
    setRows(getRows(defaultCssProperties, storyId))
  }, [storyId])
  const key = useRef(0);
  useWindowEvent('storage', (event) => setStorageGlobalProperties(event, globalCssProperties));
  useInjectStyles({
    ...globalCssProperties.current,
    ...cssLocalProperties,
  });
  const getHeaders = (hasExampleColumn) => {
    const headers = [
      <span>Name</span>,
      <span>Default</span>,
      <ControlContainer>
        <span>Control</span>
        <ResetButton
          onClick={resetArgs}
        >
          <Icons icon="undo" />
        </ResetButton>
      </ControlContainer>,
    ]
    if (hasExampleColumn) {
      headers.unshift(<span>Example</span>)
    }
    return headers
  }
  const [groupedRows] = useMemo(() => ([Object.keys(rows).reduce((rowsList, rowName) => ({
    ...rowsList,
    [rows[rowName].section]: {
      ...rowsList[rows[rowName].section],
      [rowName]: rows[rowName]
    }
  }), {})]));
  const handleChange = ([name, value]) => {
    setRows({
      ...rows,
      [name]: {
        ...rows[name],
        value: value,
      }
    });
    setCssLocalProperties({ ...cssLocalProperties, [name]: value });
  };
  const resetArgs = () => {
    key.current++;
    setRows(getRows(defaultCssProperties));
    resetCssLocalProperties({});
  };
  return (
    <KeyColorPickerContext.Provider value={key.current}>
      <Table
        hasBorder={!inAddon}
        hasExampleColumn={hasExampleColumn}
        headers={getHeaders(hasExampleColumn)}
        slotRows={
          Object.keys(groupedRows).map((rowName, index) => ([
            <TableExpandableRows
              name={rowName}
              rows={groupedRows[rowName]}
              hasExampleColumn={hasExampleColumn}
              onChange={handleChange}
              key={`${rowName}-${index}`}
            />
          ]))
        }
      />
    </KeyColorPickerContext.Provider>
  );
};

