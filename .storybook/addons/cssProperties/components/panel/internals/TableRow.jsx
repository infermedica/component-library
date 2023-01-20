import React, { useContext } from 'react';
import { styled } from '@storybook/theming';
import { ColorControl, TextControl } from '@storybook/components';
import { ExampleFontCell } from './ExampleFontCell';
import { ExampleColorCell } from './ExampleColorCell';
import { KeyColorPickerContext } from '../CssPropertiesTable';

const Row = styled.tr`
  border-top: 1px solid #E6E6E6;
`;
const Cell = styled.td`
  overflow: hidden;
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
const Control = styled(ColorControl)`
  max-width: 100%;
`;

export const TableRow = ({ row, onChange, hasExampleColumn = true }) => {
  const { name, value, defaultValue, type } = row;
  const handleChange = (newValue) => {
    onChange([name, newValue]);
  }
  const isColorType = type === 'color';
  // storybook bug: force rerender a color picker after reset a table
  const key = useContext(KeyColorPickerContext);
  return (
    <React.Fragment>
      <Row>
        {
          hasExampleColumn
            ? <Cell>
              {isColorType
                ? <ExampleColorCell
                  defaultValue={defaultValue}
                  name={name}
                  value={value}
                />
                : <ExampleFontCell
                  name={name}
                  value={value}
                  defaultValue={defaultValue}
                />
              }
            </Cell>
            : null
        }
        <Cell>
          <Name>{name}</Name>
        </Cell>
        <Cell>
          <DefaultValue>{defaultValue}</DefaultValue>
        </Cell>
        <Cell>
          {isColorType
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
