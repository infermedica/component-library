import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiBackdrop } from '@index';
import { getArgTypes } from '@sb/helpers';
import { useAttrs } from '@sb/composable';
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
    name: 'LMinHeight',
    inheritAttrs: false,
    template: `<div class="min-h-80">
      <story />
    </div>`,
  }
  ) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<BasicStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
