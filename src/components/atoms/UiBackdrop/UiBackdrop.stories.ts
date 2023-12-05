import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { computed } from 'vue';
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
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs } = useAttrs();
        const attrs = computed(() => (Object.keys(args).reduce(
          (ob, key) => {
            if (argTypes[key].table.category.match(/CSS/i)) {
              ob.style = {
                ...ob.style,
                [`--${key}`]: args[key],
              };
            } else {
              ob[key] = args[key];
            }
            return ob;
          },
          {
            ...storyAttrs,
            style: {},
          },
        )));
        return { attrs };
      },
      template: '<BasicStories v-bind="{...attrs}"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
