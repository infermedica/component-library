import React, { useState, useRef, useMemo, createContext, } from 'react';
import { IconButton, Icons } from '@storybook/components';
import { Table } from '../../../../docs/components/Table';
import { TableExpandableRows } from './internals/TableExpandableRows';
import { useWindowEvent } from '../hooks/useWindowEvents';
import { useInjectStyles } from '../hooks/useInjectStyles';
import {
  useLocalStorage,
  getStorageGlobalProperties,
  setStorageGlobalProperties,
} from '../hooks/useLocalStorage';
import {
  getRows,
  getCssProperties,
  parseScssFile,
} from '../helpers';
import { styled } from '@storybook/theming';

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
  storyId = "global", data = {}, hasBorder = true, hasExampleColumn = true, initExpanded = false,
}) => {
  const defaultCssProperties = getCssProperties(hasBorder ? parseScssFile(data) : data);
  const globalCssProperties = getStorageGlobalProperties();
  const [cssLocalProperties, setCssLocalProperties, resetCssLocalProperties] = useLocalStorage(storyId);
  const [rows, setRows] = useState(getRows(defaultCssProperties, storyId));
  // storybook bug: force rerender a color picker after reset a table
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
    setRows(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      }
    }))
    setCssLocalProperties((prevState) => ({ ...prevState, [name]: value }))
  };
  const resetArgs = () => {
    key.current++;
    setRows(getRows(defaultCssProperties));
    resetCssLocalProperties({});
  };
  return (
    <KeyColorPickerContext.Provider value={key.current}>
      <Table
        hasBorder={hasBorder}
        hasExampleColumn={hasExampleColumn}
        headers={getHeaders(hasExampleColumn)}
        slotRows={
          Object.keys(groupedRows).map((rowName, index) => ([
            <TableExpandableRows
              name={rowName}
              rows={groupedRows[rowName]}
              hasExampleColumn={hasExampleColumn}
              initExpanded={initExpanded}
              onChange={handleChange}
              key={`${rowName}-${index}`}
            />
          ]))
        }
      />
    </KeyColorPickerContext.Provider>
  );
};

