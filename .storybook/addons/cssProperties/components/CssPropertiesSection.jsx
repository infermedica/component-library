import React, { useState } from 'react';
import { CssPropertiesRow as TableRow } from './CssPropertiesRow';
import { Icons } from '@storybook/components';

import { styled } from '@storybook/theming';

const Header = styled.tr`
  background: #F6F9FC;
  border-top: 1px solid #eee;
`;
const HeaderCell = styled.td`
  position: relative;
  width: 25%;
`;
const HeaderButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
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

export const CssPropertiesSection = ({ name, rows, expandable = true, initExpanded = false }) => {
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
          <HeaderButton onClick={toggleCollapsed} />
          <HeaderText>
            <Icon icon={icon} />{name.toUpperCase()}
          </HeaderText>
        </HeaderCell>
        {
          Array(3).fill('').map((el, index) => (
            <HeaderCell key={index}>
              <HeaderButton tabIndex="-1" onClick={toggleCollapsed} />
            </HeaderCell>
          ))
        }
      </Header>
      {
        expanded
          ? Object.keys(rows).map((row) => (
            <TableRow
              name={row}
              row={rows[row]}
              key={row}
            />))
          : null
      }
    </React.Fragment >
  )
}
