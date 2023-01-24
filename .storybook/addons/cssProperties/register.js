import * as React from 'react';
import {
  addons,
  types,
} from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import { CssPropertiesTable } from './components/panel/CssPropertiesTable';
import { CssPropertiesToolbar } from './components/toolbar/CssPropertiesToolbar';

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;
const TOOLBAR_ID = `${ADDON_ID}/toolbar`;

export const getStoryId = (api) => {
  const story = api.getCurrentStoryData();
  return story ? story.kind : 'global';
};

addons.register(`${ADDON_ID}`, (api) => {
  addons.addPanel(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active }) => {
      const storyId = getStoryId(api);
      const parameter = useParameter('cssProperties', {});
      return (
        <AddonPanel active={active} key={storyId}>
          <CssPropertiesTable
            storyId={storyId}
            data={parameter}
            hasExampleColumn={false}
            inAddon={true}
            key={Object.keys(parameter)}
          />
        </AddonPanel>
      );
    },
  });

  addons.add(TOOLBAR_ID, {
    title: 'CSS Properties',
    type: types.TOOL,
    match: ({ storyId }) => !storyId.includes('design-system'),
    render: ({ active }) => (
        <CssPropertiesToolbar
          active={active}
        />
    ),
  });
});
