import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiRange } from '@index';
import { getArgTypes } from '@sb/helpers';
import { useAttrs } from '@sb/composable';
import { withVModel } from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiRange);
console.log(args);

const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    ...args,
    min: 18,
    max: 122,
    step: 1,
    modelValue: 50,
  },
  argTypes,
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
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
