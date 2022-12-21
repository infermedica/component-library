import React, { useMemo } from 'react';
import { IconButton, Icons } from '@storybook/components';
import { Table } from '../../../../docs/components/Table';
import { CssPropertiesSection as TableSection } from './CssPropertiesSection';
import { useWindowEvent } from '../hooks/useWindowEvents';
import { useInjectStyles } from '../hooks/useInjectStyles';
import {
  useLocalStorage,
  getStorageGlobalProperties,
  setStorageGlobalProperties,
} from '../hooks/useLocalStorage';
import {
  getArgs,
  getArgsTypes,
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

export const CssPropertiesTable = ({
  storyId = "global", data = {}, inAddonPanel = false,
}) => {
  const defaultCssProperties = getCssProperties(inAddonPanel ? data : parseScssFile(data));
  const globalCssProperties = getStorageGlobalProperties();
  const [cssLocalProperties, setCssLocalProperties, resetCssLocalProperties] = useLocalStorage(storyId);
  const rows = getArgsTypes(defaultCssProperties);
  const sections = getArgsTypes(defaultCssProperties)

  useWindowEvent('storage', (event) => setStorageGlobalProperties(event, globalCssProperties));
  useInjectStyles({
    ...globalCssProperties.current,
    ...cssLocalProperties
  });
  const [args] = useMemo(() => ([{
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
  const newResetArgs = () => {
    console.log('reset')
  };
  return (
    <div
      className="red"
    >
      <Table
        slotHeaders={(
          <React.Fragment>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Default</span>
            </th>
            <th>
              <span>Control</span>
            </th>
            <th>
              <ControlContainer>
                <span>
                  Example
                </span>
                <ResetButton
                  onClick={newResetArgs}
                >
                  <Icons icon="undo" />
                </ResetButton>
              </ControlContainer>
            </th>
          </React.Fragment>
        )}
        slotRows={
          Object.keys(sections).map(sectionName => ([
            <TableSection
              name={sectionName}
              rows={sections[sectionName]}
              key={sectionName}
            />
          ]))
        }
      />
    </div >
  );
};

