import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import { actions } from '@storybook/addon-actions';
import type { UiPhoneNumberProps } from './types';

const events = actions({ onUpdateInvalid: 'update:invalid' });

export default {
  title: 'Organisms/PhoneNumber',
  component: UiPhoneNumber,
  args: {
    modelValue: '',
    touched: false,
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
      @update:invalid="onUpdateInvalid"
    />
  `,
});
