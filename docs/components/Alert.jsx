import React from 'react';
import { styled } from '@storybook/theming';

const success = {
  background: '#E6F9F2',
  borderColor: '#6DDEB6',
};
const info = {
  background: '#EDF6FD',
  borderColor: '#A2CFF5',
};
const warning = {
  background: '#FEF4D6',
  borderColor: '#FFC037',
};
const error = {
  background: '#FFF1F1',
  borderColor: 'color-border/error-subtle',
};
const themes = {
  success,
  info,
  warning,
  error,
};

const Container = styled.div`
  border-left: 5px solid;
  border-color: ${(props) => themes[props.theme].borderColor};
  background: ${(props) => themes[props.theme].background};
  padding: 1rem;
  margin: 0.5rem 0 1rem;
  font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;`;

export const Alert = ({ children, theme = 'info' }) => <Container
    theme={theme}
  >
    {children}
  </Container>;
