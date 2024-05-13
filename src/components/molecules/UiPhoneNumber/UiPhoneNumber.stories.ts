import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import polishCountriesTranslation from 'i18n-iso-countries/langs/pl.json';
import UiPhoneNumber from './UiPhoneNumber.vue';
import UiFormField from '../UiFormField/UiFormField.vue';
import { i18nCountries } from './helpers';

const customCountryCodeItems = [
  'AF',
  'AL',
  'DZ',
  'AS',
  'AD',
  'AO',
  'AI',
  'AQ',
  'AG',
  'AR',
  'AM',
];

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
    errorMessage: false,
    countryCodes: undefined,
    class: [],
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

export const WithTranslatedCountryNames: StoryObj<typeof UiPhoneNumber> = {
  render(args, { name }) {
    return {
      name,
      components: {
        UiFormField,
        UiPhoneNumber,
      },
      setup() {
        i18nCountries.registerLocale(polishCountriesTranslation);
        return { args };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
    >
      <UiPhoneNumber
        v-bind="{ language: 'pl', ...args }"
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
      :error-message="args.errorMessage"
    >
      <UiPhoneNumber
        v-bind="{...args}"
      />
    </UiFormField>`,
    };
  },
  args: {
    errorMessage: 'Please enter the phone number',
    class: [ 'ui-phone-number--has-error' ],
  },
};

export const WithCustomCountryCodesAndDefault: StoryObj<typeof UiPhoneNumber> = {
  render(args, { name }) {
    return {
      name,
      components: {
        UiFormField,
        UiPhoneNumber,
      },
      setup() {
        const modelValue = ref(args.modelValue);
        return {
          args,
          modelValue,
        };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
      :error-message="args.errorMessage"
    >
      <UiPhoneNumber
        v-bind="{...args}"
        v-model="modelValue"
      />
    </UiFormField>`,
    };
  },
};
WithCustomCountryCodesAndDefault.args = {
  modelValue: {
    prefix: {
      countryCode: customCountryCodeItems[2],
    },
    phoneNumber: '',
  },
  countryCodes: customCountryCodeItems,
};

export const WithCustomCountryCodesWithTimeout: StoryObj<typeof UiPhoneNumber> = {
  render(args, { name }) {
    return {
      name,
      components: {
        UiFormField,
        UiPhoneNumber,
      },
      setup() {
        const countryCodes = ref(args.countryCodes);
        const modelValue = ref<Record<string, unknown>>({ phoneNumber: '' });

        setTimeout(() => {
          countryCodes.value = customCountryCodeItems;
          modelValue.value.prefix = countryCodes.value[0];
        }, 3000);
        return {
          args,
          countryCodes,
          modelValue,
        };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
      :error-message="args.errorMessage"
    >
      <UiPhoneNumber
        v-bind="{...args}"
        v-model="modelValue"
        :country-codes="countryCodes"
      />
    </UiFormField>`,
    };
  },
};
WithCustomCountryCodesWithTimeout.args = {
  modelValue: {
    prefix: {
      code: '',
      countryCode: '',
      country: '',
    },
    phoneNumber: '',
  },
  countryCodes: [],
};
