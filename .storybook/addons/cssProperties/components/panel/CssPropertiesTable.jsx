import React, { useState, useRef, useMemo, createContext } from 'react';
import { styled } from '@storybook/theming';
import { Table } from '../../../../../docs/components/Table';
import { TableExpandableRows } from './internals/TableExpandableRows';
import { getTableHeader } from './internals/TableHeader';
import { useWindowEvent } from '../../hooks/useWindowEvents';
import { useInjectStyles } from '../../hooks/useInjectStyles';
import { useCssPropertiesState } from '../../hooks/useCssPropertiesState';
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

const Empty = styled.div(({ theme }) => ({
  background: theme.background.app,
  padding: "10px 15px",
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
  lineHeight: "20px",
}));

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
  const [rows, setRows] = useState(getRows(defaultCssProperties, storyId));
  const [groupedRows] = useMemo(() => ([
    Object.keys(rows).reduce((rowsList, rowName) => ({
      ...rowsList,
      [rows[rowName].section]: {
        ...rowsList[rows[rowName].section],
        [rowName]: rows[rowName]
      }
    }), {})
  ]));
  if (inAddon) {
    useCssPropertiesState(() => {
      resetArgs()
      globalCssProperties.current = {}
    })
    useInjectStyles({
      ...globalCssProperties.current,
      ...cssLocalProperties,
    });
  }
  useWindowEvent('storage', (event) => setStorageGlobalProperties(event, globalCssProperties));
  const key = useRef(0);
  const resetArgs = () => {
    key.current++;
    setRows(getRows(defaultCssProperties));
    resetCssLocalProperties({});
  };
  const handleChange = ([name, value]) => {
    setRows((prevState) => {
      prevState[name].value = value
      return prevState
    })
    setCssLocalProperties({ ...cssLocalProperties, [name]: value });
  };
  return (
    <KeyColorPickerContext.Provider value={key.current}>
      {
        Object.keys(data).length
          ? <Table
            hasBorder={!inAddon}
            hasExampleColumn={hasExampleColumn}
            headers={getTableHeader(hasExampleColumn, resetArgs)}
            slotRows={
              Object.keys(groupedRows).map((rowName, index) => ([
                <TableExpandableRows
                  name={rowName}
                  rows={groupedRows[rowName]}
                  hasExampleColumn={hasExampleColumn}
                  onChange={handleChange}
                  key={`${rowName}-${index}`}
                />
              ]))}
          />
          : <Empty>
            <span>
              This story isn`t configured to handle
              <b> CSS Custom Properties</b>.
            </span>
          </Empty>
      }
    </KeyColorPickerContext.Provider>
  );
};

