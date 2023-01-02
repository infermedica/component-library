import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import { CssPropertiesTable } from './components/CssPropertiesTable';

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active }) => {
      const story = api.getCurrentStoryData();
      const storyId = story ? story.kind : 'global';
      const parameter = useParameter('cssProperties', {})
      return (
        <AddonPanel active={active} key={storyId}>
          <CssPropertiesTable
            storyId={storyId}
            data={parameter}
            hasExampleColumn={false}
            inAddon={true}
            key={Object.keys(parameter).length}
          />
        </AddonPanel>
      )
    }
  });
});