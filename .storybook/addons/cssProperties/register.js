import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import CssPropertiesTable from '../../../docs/components/CssPropertiesTable.jsx';

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <CssPropertiesTable data={useParameter('cssProperties')} inAddonPanel={true}/>
      </AddonPanel>
    ),
  });
});