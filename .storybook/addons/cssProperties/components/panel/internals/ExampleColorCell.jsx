import React from 'react';
import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import { FontExample } from './ExampleFontCell'
import { getBackgroundColor } from '../../../helpers';

const BackgroundExample = styled.div`
  display: flex;
  justify-content: ${({ isCentered }) => isCentered && 'center'};
  width: ${({ condensed }) => condensed && 'fit-content'};
  padding: ${({ isCentered }) => !isCentered && '4px'};
  border-radius: 3px;
  background: ${({ background }) => background};
  box-shadow: ${({ isCentered }) => isCentered && 'inset 0 0 0 1px #0000001a'};
  font-weight: 600;
  line-height: 32px;
`;
const BorderColorExample = styled.div`
  height: 28px;
  width: 100%;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${({ borderColor }) => borderColor};
  background: ${({ background }) => background};
`;
const IconColorExample = styled(Icons)`
  width: 24px;
  height: 24px;
  padding: 4px;
  background: ${({ background }) => background};
  color: ${({ colorIcon }) => colorIcon || 'white'};
`;

export const ExampleColorCell = ({ name, value, defaultValue }) => {
  const isBorder = name.includes('border');
  const isIcon = name.includes('icon') && !name.includes('background');
  const isText = name.includes('text') && !name.includes('background');
  if (isIcon || isText || isBorder) {
    return <BackgroundExample
      condensed={!isBorder}
      background={getBackgroundColor(name, defaultValue)}
    >
      {isIcon && <IconColorExample
        icon='plus'
        colorIcon={getBackgroundColor(name, defaultValue)}
        background={value}
      />
      }
      {isText && <FontExample color={value}> Example text</FontExample>}
      {isBorder && <BorderColorExample
        borderColor={value}
        background={getBackgroundColor(name, defaultValue)}
      />}
    </BackgroundExample>
  }
  const colorVar = defaultValue.includes('var') ? defaultValue : name;
  const isLight = parseInt(colorVar.replace(')', '').split('-').at(-1), 10) > 500;
  return <BackgroundExample isCentered background={value}>
    <FontExample isLight={isLight} isSmall>Example text</FontExample>
  </BackgroundExample>
}