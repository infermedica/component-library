import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme,
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
});