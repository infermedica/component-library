import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import type { UiPhoneNumberProps } from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import type { PhoneCodeType } from '@/utilities/helpers';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdatePhoneNumber: 'update:phoneNumber',
  onUpdatePhoneCode: 'update:phoneCode',
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
    phoneNumber: '',
    phoneCode: '+1',
    touched: false,
    language: 'en',
    defaultCountryCode: 'US',
  },
  argTypes: {
    phoneNumber: { control: 'text' },
    phoneCode: { control: 'text' },
    touched: { control: 'boolean' },
  },
};

export const Common = (args: UiPhoneNumberProps) => ({
  components: { UiPhoneNumber },
  setup() {
    const phoneCode = ref(args.phoneCode);
    const phoneNumber = ref(args.phoneNumber);

    const onUpdatePhoneNumber = (value: string) => {
      phoneNumber.value = value;
      events.onUpdatePhoneNumber();
    };

    const onUpdatePhoneCode = (value: PhoneCodeType) => {
      phoneCode.value = value;
      events.onUpdatePhoneCode();
    };

    return {
      ...args,
      ...events,
      phoneCode,
      phoneNumber,
      onUpdatePhoneNumber,
      onUpdatePhoneCode,
    };
  },
  template: `
    <UiPhoneNumber
      v-model:phone-code="phoneCode"
      v-model:phone-number="phoneNumber"
      v-model:touched="touched"
      @update:modelValue="onUpdateModelValue"
      @update:phoneNumber="onUpdatePhoneNumber"
      @update:phoneCode="onUpdatePhoneCode"
      @update:touched="onUpdateTouched"
      @update:invalid="onUpdateInvalid"
    />
  `,
});
