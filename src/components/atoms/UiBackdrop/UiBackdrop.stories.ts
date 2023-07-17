import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiBackdrop } from '@index';
import { useArgTypes } from '@sb/helpers';

const { argTypes } = useArgTypes(UiBackdrop);
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  argTypes,
  decorators: [ () => ({ template: '<div class="min-h-80"><story/></div>' }) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = { render: () => (BasicStories) };
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
