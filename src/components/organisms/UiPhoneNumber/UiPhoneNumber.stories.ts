import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import type { UiPhoneNumberProps } from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateTouched: 'update:touched',
  onUpdateInvalid: 'update:invalid',
});

export default {
  title: 'Organisms/PhoneNumber',
  component: UiPhoneNumber,
  args: {
    translation: {
      phoneNumberLabel: 'Phone number',
      phoneNumberPlaceholder: 'Put your phone number',
      countryCodeLabel: 'Country code',
      errorMessage: 'Error message',
    },
    modelValue: '',
    touched: false,
    language: 'en',
    defaultCountryCode: 'US',
  },
  argTypes: {
    modelValue: { control: { type: 'text' } },
    touched: { control: 'boolean' },
  },
};

export const Common = (args: UiPhoneNumberProps) => ({
  components: { UiPhoneNumber },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `
    <UiPhoneNumber
      v-model="modelValue"
      v-model:touched="touched"
      @update:modelValue="onUpdateModelValue"
      @update:touched="onUpdateTouched"
      @update:invalid="onUpdateInvalid"
    />
  `,
});
