import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { KeyColorPickerContext } from '../CssPropertiesTable';
import { ColorControl, TextControl } from '@storybook/components';
import { styled } from '@storybook/theming';

const Row = styled.tr`
  border-top: 1px solid #E6E6E6;
`;
const Cell = styled.td`
  padding: 10px 5px;
  &:first-of-type{
    padding: 10px 5px 10px 15px;
  }
  &:last-of-type{
    padding: 10px 15px 10px 5px;
  }
`;
const Name = styled.span`
  font-weight: 700;
`;
const DefaultValue = styled.span`
  padding: 2px 5px;
  border: 1px solid #eee;
  color: #333333e5;
  background-color: #f8f8f8;
  border-radius: 3px;
`;
const ExampleText = styled.div`
  color: #fff;
  box-shadow: inset 0 0 0 1px #0000001a;
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  line-height: 32px;
  border-radius: 3px;
`;
const Control = styled(ColorControl)`
  max-width: 100%;
`;

export const TableRow = ({ row, onChange, hasExampleColumn = true }) => {
  const { name, value, defaultValue } = row;
  const handleChange = (newValue) => {
    onChange([name, newValue]);
  }
  // storybook bug: force rerender a color picker after reset a table
  const key = useContext(KeyColorPickerContext)
  return (
    <React.Fragment>
      <Row>
        {
          hasExampleColumn
            ? <Cell>
              <ExampleText style={{ background: value }}>
                <span>example text</span>
              </ExampleText>
            </Cell> : null
        }
        <Cell>
          <Name>{name}</Name>
        </Cell>
        <Cell>
          <DefaultValue>{defaultValue}</DefaultValue>
        </Cell>
        <Cell>
          {row.type === 'color'
            ? <Control
              name={name}
              value={value}
              onChange={handleChange}
              key={key}
            />
            : <TextControl
              name={name}
              value={value}
              onChange={handleChange}
            />
          }
        </Cell>
      </Row>
    </React.Fragment >
  )
}
