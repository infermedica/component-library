import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import type { UiPhoneNumberProps } from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
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

export const WithLegendSlot = (args: UiPhoneNumberProps) => ({
  components: {
    UiPhoneNumber,
    UiText,
  },
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
    >
    <template #legend="{ label }">
      <UiText
        tag="legend"
        class="ui-form-field__label ui-phone-number__label"
      >
        <UiText
          class="ui-form-field__label-text"
          tag="span"
        >
          {{ label }}
        </UiText>
      </UiText>
    </template>
    </UiPhoneNumber>
  `,
});

export const WithDropdownSlot = (args: UiPhoneNumberProps) => ({
  components: {
    UiPhoneNumber,
    UiFormField,
    UiDropdown,
    UiButton,
    UiIcon,
    UiDropdownItem,
  },
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
    >
      <template #dropdown="{
        phoneCodes,
        code,
        handleOnChangeCode,
        updateOffset,
        formattedPrefix,
        error,
        label
      }">
        <UiFormField
          id="ui-phone-number__dropdown"
          class="ui-phone-number__dropdown-form-field"
          :error-message="false"
          :label="label"
          :text-message-attrs="{ class: 'visual-hidden' }"
          :text-hint-attrs="{ class: 'visual-hidden' }"
        >
          <template #default>
            <UiDropdown
              id="ui-phone-number__dropdown"
              class="ui-phone-number__dropdown"
              :model-value="code"
              :popover-attrs="{ class: 'ui-phone-number__dropdown-popover' }"
              @update:model-value="handleOnChangeCode"
            >
              <template #toggle="{ toggleHandler, isOpen }">
                <UiButton
                  id="ui-phone-number__dropdown"
                  class="ui-button--outlined ui-button--has-icon ui-phone-number__dropdown-button"
                  :class="{ 'ui-button--has-error': error, }"
                  type="button"
                  @click="event => updateOffset(event, toggleHandler)"
                >
                  <span class="ui-phone-number__dropdown-text--desktop">
                    {{ formattedPrefix }}
                  </span>
                  <span class="ui-phone-number__dropdown-text--mobile">
                    {{ code?.country }} ({{ code?.code }})
                  </span>
                  <UiIcon
                    :icon="isOpen ? \`chevron-up\` : \`chevron-down\`"
                    class="ui-button__icon"
                  />
                </UiButton>
              </template>
              <template
                v-for="(option, key) in phoneCodes"
                :key="key"
              >
                <UiDropdownItem
                  :value="option"
                  class="ui-dropdown-item--compact ui-phone-number__dropdown-item"
                >
                  {{ option.country }} ({{ option.code }})
                </UiDropdownItem>
              </template>
            </UiDropdown>
          </template>
        </UiFormField>
      </template>
    </UiPhoneNumber>
  `,
});

export const WithInputSlot = (args: UiPhoneNumberProps) => ({
  components: { UiPhoneNumber, UiFormField, UiInput },
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
    >
      <template #input="{
        value,
        error,
        label,
        placeholder,
        handleOnBlur
      }">
        <UiFormField
          id="ui-phone-number__input"
          class="ui-phone-number__input-form-field"
          :error-message="error"
          :label="label"
          :text-message-attrs="{ class: 'visual-hidden' }"
          :text-hint-attrs="{ class: 'visual-hidden' }"
        >
          <template #default="{ id }">
            <UiInput
              :id="id"
              v-model="value"
              class="ui-phone-number__input"
              :class="{ 'ui-input--has-error': error, }"
              :placeholder="placeholder"
              type="number"
              @blur="handleOnBlur"
            />
          </template>
        </UiFormField>
      </template>
    </UiPhoneNumber>
  `,
});
