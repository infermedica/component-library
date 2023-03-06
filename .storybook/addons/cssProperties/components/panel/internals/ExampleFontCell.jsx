import React from 'react';
import { styled } from '@storybook/theming';

const CustomExample = styled.div`
  width: ${({ size, isCircle }) => isCircle ? '46px' : size || ''};
  height: ${({ size }) => size};
  background: ${({ background }) => background};
  border-radius: ${({ radius }) => radius};
  min-height: ${({ size }) => !size && '46px'};
  box-shadow: ${({ shadow, focus }) => shadow || focus || ''};
  opacity: ${({ opacity }) => opacity};
`;
export const FontExample = styled.span`
  color: ${({ isLight, color }) => color ? color : isLight ? '#F3F5F7' : '#1F262Cff'};
  font-size: ${({ isSmall }) => isSmall ? '13px' : '16px'};
  padding: 0 4px;
`;

export const ExampleFontCell = ({ name, value }) => {
  const [cssPropertyHead, cssPropertyTail] = name.replace('--', '').split('-');
  const isTypography = name.match(/font|letter|line/) !== null;
  if (isTypography) {
    const getFontStyle = () => {
      if (['family', 'size', 'weight', 'spacing', 'height'].includes(cssPropertyTail)) {
        const [firstLetter, ...rest] = cssPropertyTail;
        return ({ [`${cssPropertyHead}${firstLetter.toUpperCase()}${rest.join('')}`]: value });
      }
      return { font: value }
    }
    return <FontExample style={getFontStyle()}>Example text</FontExample>
  }
  const attrs = {
    space: {
      size: value,
      background: '#1471C9',
    },
    radius: {
      radius: value,
      background: '#1471C9',
      isCircle: name.includes('circle'),
    },
    shadow: {
      shadow: value,
    },
    focus: {
      focus: value,
      background: name.includes('outer') && '#127F5B',
      radius: '5px',
    },
    opacity: {
      opacity: value,
      background: '#000',
    }
  }
  const key = attrs.hasOwnProperty(cssPropertyHead) ? cssPropertyHead : cssPropertyTail
  return <CustomExample {...attrs[key]} />
}