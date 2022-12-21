import React, { useState } from 'react';
import { ColorControl } from '@storybook/components';
import { styled } from '@storybook/theming';

const Row = styled.tr`
  border-top: 1px solid #E6E6E6;
`;
const Cell = styled.td`
  padding: 10px 5px;
  width: 25%;
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

export const CssPropertiesRow = ({ name, row }) => {
  const [value, setValue] = useState(row.value)
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  return (
    <React.Fragment>
      <Row>
        <Cell>
          <Name>{row.name}</Name>
        </Cell>
        <Cell>
          <DefaultValue>{row.defaultValue}</DefaultValue>
        </Cell>
        <Cell>
          <ColorControl
            name={row.name}
            value={value}
            defaultValue={row.value}
            onChange={handleChange}
          />
        </Cell>
        <Cell >
          <ExampleText style={{ background: value }}>
            <span>example text</span>
          </ExampleText>
        </Cell>
      </Row>
    </React.Fragment >
  )
}
