import { styled } from '@storybook/theming';

const ExampleText = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  line-height: 32px;
  box-shadow: inset 0 0 0 1px #0000001a;
  border-radius: 3px;
  color: ${({ type }) => type === 'color' ? '#fff' : '#000'};
`;

export const ExampleCell = ({ type, property: [varName, value] }) => {
  const getStyles = () => {
    if (type === 'color') {
      return { background: value };
    } else {
      const [cssPropertyHead, cssPropertyTail] = varName.replace('--', '').split('-');
      const getCssPropertyName = () => {
        switch (cssPropertyHead) {
          case 'space':
            return 'padding';
          case 'opacity':
            return 'opacity';
          case 'focus':
            return 'boxShadow';
          default:
            if (['body', 'button', 'caption', 'heading'].includes(cssPropertyTail)) {
              return cssPropertyHead;
            }
            const [firstLetter, ...rest] = cssPropertyTail;
            return `${cssPropertyHead}${firstLetter.toUpperCase()}${rest.join('')}`;
        }
      }
      return {
        [getCssPropertyName()]: value,
      }
    }
  }
  return (
    <ExampleText type={type} style={getStyles()}>
      <span>example text</span>
    </ExampleText>
  )
}