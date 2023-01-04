import React from 'react';
import { IconButton, Icons } from '@storybook/components';
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

export const getTableHeader = (hasExampleColumn, onReset) => {
  const headers = [
    <span>Name</span>,
    <span>Default</span>,
    <ControlContainer>
      <span>Control</span>
      <ResetButton
        onClick={onReset}
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