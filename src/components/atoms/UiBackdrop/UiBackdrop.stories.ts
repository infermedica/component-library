import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiBackdrop } from '@index';
import { getArgTypes } from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiBackdrop);

const meta = {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  args,
  argTypes,
  decorators: [ (story, { id }) => ({
    inheritAttrs: false,
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: `<div class="min-h-80">
      <story 
        v-bind="attrs" 
        :key="id"
      />
    </div>`,
  }
  ) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = { render: () => (BasicStories) };
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
