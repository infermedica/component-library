import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import CssPropertiesTable from './components/CssPropertiesTable.jsx';

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active }) => {
      const story = api.getCurrentStoryData();
      const storyId = story ? story.kind : 'global'
      return (
        <AddonPanel active={active} key={storyId}>
          <CssPropertiesTable data={useParameter('cssProperties')} inAddonPanel={true} storyId={storyId} active={active}/>
        </AddonPanel>
      )
  }});
});