import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import type { TabsProps } from '@index';
import {
  UiTabs,
  UiText,
} from '@index';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import type { TabsItemAttrsProps } from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';

type TabsArgsType = TabsProps & {
  items?: TabsProps[],
  content?: Record<string, string>,
  modifiers?: string[]
}
type TabsMetaType = Meta<TabsArgsType>;
type TabsStoryType = StoryObj<TabsArgsType>

const items: TabsItemAttrsProps[] = [
  {
    name: 'search',
    title: 'Search',
    'data-testid': 'search',
    buttonTabAttrs: { 'data-testid': 'search-button' },
    contentAttrs: { 'data-testid': 'search-content' },
  },
  {
    name: 'point',
    title: 'Point on the body',
    buttonTabAttrs: { 'data-testid': 'point-button' },
    contentAttrs: { 'data-testid': 'point-content' },
  },
  {
    name: 'drop',
    title: 'Drop body point',
    buttonTabAttrs: { 'data-testid': 'drop-button' },
    contentAttrs: { 'data-testid': 'drop-content' },
  },
];

const { argTypes } = useArgTypes(UiTabs);
import BasicStories from './stories/Basic.vue';
import BasicStoriesCode from './stories/Basic.vue?raw';
import WithDefaultSlotStories from './stories/WithDefaultSlot.vue';
import WithDefaultSlotStoriesCode from './stories/WithDefaultSlot.vue?raw';

const meta = {
  title: 'Organisms/Tabs',
  component: UiTabs,
  args: {
    content:
      {
        search: 'Serum uric acid concentration',
        point: '1. Erythrocyte Sedimentation Rate',
      },
    modifiers: [],
    modelValue: 'point',
    items,
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
    },
    ...argTypes,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies TabsMetaType;

export default meta;

export const Basic: TabsStoryType = { render: () => (BasicStories) };
Basic.parameters = { docs: { source: { code: BasicStoriesCode } } };

export const Fixed: TabsStoryType = { ...Basic };
Fixed.args = { modifiers: [ 'ui-tabs--fixed' ] };

export const WithDefaultSlot: TabsStoryType = { render: () => (WithDefaultSlotStories) };
WithDefaultSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: WithDefaultSlotStoriesCode } },
};
