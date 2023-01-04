import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import { CssPropertiesTable } from './components/panel/CssPropertiesTable';
import { CssPropertiesToolbar } from './components/toolbar/CssPropertiesToolbar';
import { styled } from '@storybook/theming';

const ADDON_ID = 'CssProperties';
const PANEL_ID = `${ADDON_ID}/panel`;
const TOOLBAR_ID = `${ADDON_ID}/toolbar`;

const Empty = styled.div(({ theme }) => ({
  background: theme.background.app,
  padding: "10px 15px",
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
  lineHeight: "20px",
}));

const getStoryId = (api) => {
  const story = api.getCurrentStoryData();
  return story ? story.kind : 'global';
}

addons.register(`${ADDON_ID}`, (api) => {
  addons.addPanel(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS Properties',
    render: ({ active }) => {
      const storyId = getStoryId(api);
      const parameter = useParameter('cssProperties', {})
      return (
        <AddonPanel active={active} key={storyId}>
          { Object.keys(parameter).length
            ? <CssPropertiesTable
              storyId={storyId}
              data={parameter}
              hasExampleColumn={false}
              inAddon={true}
            />
            : <Empty>
              <span>
                This story isn`t configured to handle
                <b> CSS Custom Properties</b>.
              </span>
            </Empty>
          }
        </AddonPanel>
      )
    }
  });

  addons.add(TOOLBAR_ID, {
    title: "CSS Properties",
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({ active }) => {
      const storyId = getStoryId(api);
      return (
        <CssPropertiesToolbar
          active={active}
          storyId={storyId}
          key={storyId}
        />
      )
    }
  })
});