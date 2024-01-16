import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import UiPhoneNumber from './UiPhoneNumber.vue';
import UiFormField from '../UiFormField/UiFormField.vue';

const meta = {
  title: 'Molecules/PhoneNumber',
  component: UiPhoneNumber,
  args: {
    modelValue: {
      prefix: {
        code: '+1',
        countryCode: 'US',
        country: 'United States of America',
      },
      phoneNumber: '',
    },
    id: 'input-id',
    error: false,
  },
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
      components: {
        UiFormField,
        UiPhoneNumber,
      },
      setup() {
        return { args };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
    >
      <UiPhoneNumber
        v-bind="{...args}"
      />
    </UiFormField>`,
    };
  },
};

export const WithError: StoryObj<typeof UiPhoneNumber> = {
  render(args, { name }) {
    return {
      name,
      components: {
        UiFormField,
        UiPhoneNumber,
      },
      setup() {
        return { args };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
      :error-message="args.error"
    >
      <UiPhoneNumber
        v-bind="{...args}"
      />
    </UiFormField>`,
    };
  },
  args: { error: 'Please enter the phone number' },
};
