import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import UiPhoneNumber from './UiPhoneNumber.vue';
import { BasicStories } from './stories';

const meta = {
  title: 'Organisms/PhoneNumber',
  component: UiPhoneNumber,
  args: {},
  argTypes: {},
  decorators: [ () => ({
    name: 'LMinHeight',
    inheritAttrs: false,
    template: `<div class="min-h-115">
      <story />
    </div>`,
  }
  ) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj<typeof UiPhoneNumber> = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const prefix = ref(args.prefix);
        const phoneNumber = ref(args.phoneNumber);
        return {
          args,
          prefix,
          phoneNumber,
        };
      },
      template: `<BasicStories 
        v-model:prefix="prefix"
        v-model:phone-number="phoneNumber"
      />`,
    };
  },
  args: {
    prefix: {
      code: '+1',
      countryCode: 'US',
      country: 'United States of America',
    },
    phoneNumber: '',
  },
};
// Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
