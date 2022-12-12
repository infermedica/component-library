import React from 'react';
import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import CssPropertiesTable from '../docs/components/CssPropertiesTable';
import theme from './theme';

addons.setConfig({
  theme,
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
});

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <CssPropertiesTable inAddonPanel={true}/>
      </AddonPanel>
    ),
  });
});
