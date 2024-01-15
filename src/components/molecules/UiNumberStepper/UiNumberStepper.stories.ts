import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiNumberStepper } from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { withVModel } from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiNumberStepper);

const meta = {
  title: 'Molecules/NumberStepper',
  component: UiNumberStepper,
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
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{...attrs}"/>',
    };
  },
};
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
