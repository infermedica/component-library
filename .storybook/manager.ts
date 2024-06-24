import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    collapsedRoots: ['releases', 'templates', 'utilities'],
  },
});
