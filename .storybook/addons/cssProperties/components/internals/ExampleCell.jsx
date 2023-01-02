import { styled } from '@storybook/theming';

const ExampleText = styled.div`
  color: ${({ type }) => type === 'color' ? '#fff' : '#000'};
  box-shadow: inset 0 0 0 1px #0000001a;
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  line-height: 32px;
  border-radius: 3px;
`;

export const ExampleCell = ({ type, property: [varName, value] }) => {
  const getStyles = () => {
    if (type === 'color') {
      return { background: value }
    } else {
      const [cssPropertyHead, cssPropertyTail] = varName.replace('--', '').split('-');
      const getCssPropertyName = () => {
        if (['body', 'button', 'caption', 'heading'].includes(cssPropertyTail)) return cssPropertyHead;
        if (cssPropertyHead === 'space') return "padding";
        else {
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