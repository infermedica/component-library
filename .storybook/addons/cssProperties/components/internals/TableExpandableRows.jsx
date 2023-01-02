import React, { useState } from 'react';
import { TableRow } from './TableRow';
import { Icons } from '@storybook/components';

import { styled } from '@storybook/theming';

const Header = styled.tr`
  border-top: 1px solid #eee;
  background-color: #f6f9fc;
  &:first-of-type {
    border-top: none;
  }
`;
const HeaderCell = styled.td`
  position: relative;
`;
const HeaderButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: ${({ hasExampleColumn }) => hasExampleColumn ? '-300%' : '-200%'};
  bottom: 0;
  left: 0;
  border: none;
  background-color: transparent;
`;
const HeaderText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
    padding: 10px 15px;
    letter-spacing: 0.35em;
  color: #33333399;
  font-size: 11px;
  font-weight: 900;
`;
const Icon = styled(Icons)`
  width: 12px;
  height: 12px;
`;

export const TableExpandableRows = ({
  name,
  rows,
  onChange,
  expandable = true,
  initExpanded = false,
  hasExampleColumn = true,
}) => {
  const [expanded, setExpanded] = useState(expandable && initExpanded);
  const toggleCollapsed = () => {
    if (expandable) {
      setExpanded((prevState) => !prevState);
    }
  };
  const icon = expanded ? 'arrowdown' : 'arrowright';

  return (
    <React.Fragment>
      <Header>
        <HeaderCell>
          <HeaderButton
            hasExampleColumn={hasExampleColumn}
            onClick={toggleCollapsed}
          />
          <HeaderText>
            <Icon icon={icon} />{name.toUpperCase()}
          </HeaderText>
        </HeaderCell>
        <td></td>
        <td></td>
        {hasExampleColumn && <td></td>}
      </Header>
      {
        expanded
          ? Object.keys(rows).map((rowName, index) => (
            <TableRow
              row={rows[rowName]}
              hasExampleColumn={hasExampleColumn}
              key={`${rowName}-${index}`}
              onChange={onChange}
            />))
          : null
      }
    </React.Fragment >
  )
}
