import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import polishCountriesTranslation from 'i18n-iso-countries/langs/pl.json';
import UiPhoneNumber from './UiPhoneNumber.vue';
import UiFormField from '../UiFormField/UiFormField.vue';
import { countriesLocales } from './helpers';

const customCountryCodeItems = [
  {
    code: '+93',
    countryCode: 'AF',
    country: 'Afghanistan',
  },
  {
    code: '+355',
    countryCode: 'AL',
    country: 'Albania',
  },
  {
    code: '+213',
    countryCode: 'DZ',
    country: 'Algeria',
  },
  {
    code: '+1684',
    countryCode: 'AS',
    country: 'American Samoa',
  },
  {
    code: '+376',
    countryCode: 'AD',
    country: 'Andorra',
  },
  {
    code: '+244',
    countryCode: 'AO',
    country: 'Angola',
  },
  {
    code: '+1264',
    countryCode: 'AI',
    country: 'Anguilla',
  },
  {
    code: '+672',
    countryCode: 'AQ',
    country: 'Antarctica',
  },
  {
    code: '+1268',
    countryCode: 'AG',
    country: 'Antigua and Barbuda',
  },
  {
    code: '+54',
    countryCode: 'AR',
    country: 'Argentina',
  },
  {
    code: '+374',
    countryCode: 'AM',
    country: 'Armenia',
  },
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
        countriesLocales.set('pl', polishCountriesTranslation);
        return { args };
      },
      template: `<UiFormField
      v-bind="{...args}"
      message="Phone number"
    >
      <UiPhoneNumber
        v-bind="{ languageData: { language: 'pl', country: 'us' }, ...args }"
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

export const WithCustomCountryCodes: StoryObj<typeof UiPhoneNumber> = {
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
WithCustomCountryCodes.args = {
  modelValue: {
    prefix: customCountryCodeItems[0],
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
