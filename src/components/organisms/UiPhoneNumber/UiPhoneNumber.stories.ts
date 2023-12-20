import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import UiPhoneNumber from './UiPhoneNumber.vue';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const meta = {
  title: 'Organisms/PhoneNumber',
  component: UiPhoneNumber,
  args: {},
  argTypes: {},
  decorators: [],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        return { args };
      },
      template: '<BasicStories v-bind="args"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
