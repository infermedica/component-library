import { styled } from '@storybook/theming';

const ColorExample = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  line-height: 32px;
  box-shadow: inset 0 0 0 1px #0000001a;
  border-radius: 3px;
  background: ${({ background }) => background};
`;
const CustomExample = styled.div`
  width: ${({ size, isCircle }) => isCircle ? '46px' : size || ''};
  height: ${({ size }) => size};
  background: ${({ background }) => background};
  border-radius: ${({ radius }) => radius};
  min-height: ${({ size }) => !size && '46px'};
  box-shadow: ${({ shadow, focus }) => shadow || focus || ''};
  opacity: ${({ opacity }) => opacity};
`
const FontExample = styled.span`
  color: ${({ isLight }) => isLight ? '#F3F5F7' : '#1F262Cff'};
  font-size: ${({ isSmall }) => isSmall ? '13px' : '16px'};
`

export const ExampleCell = ({ type, property: [varName, value], defaultValue }) => {
  const [cssPropertyHead, cssPropertyTail] = varName.replace('--', '').split('-');
  if (type === 'color') {
    const colorVar = defaultValue.includes('var') ? defaultValue : varName;
    const isLight = parseInt(colorVar.replace(')', '').split('-').at(-1), 10) > 500;
    return <ColorExample background={value}>
      <FontExample isLight={isLight} isSmall>Example text</FontExample>
    </ColorExample>
  }
  if (varName.includes('font') || varName.includes('letter') || varName.includes('line')) {
    const getFontStyle = () => {
      if (['family', 'size', 'weight', 'spacing', 'height'].includes(cssPropertyTail)) {
        console.log(cssPropertyTail)
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
      background: '#1471C9'
    },
    radius: {
      radius: value,
      background: '#1471C9',
      isCircle: varName.includes('circle'),
    },
    shadow: {
      shadow: value,
    },
    focus: {
      focus: value,
      background: varName.includes('outer') && '#127F5B',
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