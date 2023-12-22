<template>
  <div class="ui-phone-number">
    <label for="ui-phone-number-form-fields">
      <UiText
        class="ui-text--body-2-comfortable"
        tag="span"
      >
        {{ label }}
      </UiText>
    </label>
    <div
      id="ui-phone-number-form-fields"
      class="ui-phone-number-form-fields"
    >
      <UiPhoneNumberPrefix
        v-model="prefix"
      />
      <UiPhoneNumberInput
        v-model="phoneNumber"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiPhoneNumberPrefix from './_internal/UiPhoneNumberPrefix/UiPhoneNumberPrefix.vue';
import UiPhoneNumberInput from './_internal/UiPhoneNumberInput/UiPhoneNumberInput.vue';
import type { PhoneCodeType } from '../../../utilities/helpers';

export interface UiPoneNumberProps {
  /**
   * Use this props to set label text.
   */
  label?: string,
  /**
   * Use this props to set default prefix phone code.
   */
  prefix?: PhoneCodeType,
  /**
   * Use this props to pass phone number.
   */
  phoneNumber?: string,
  /**
   * Use this props to set input placeholder.
   */
  placeholder?: string,
  /**
   * Use this props to set alert message
   */
  errorMessage?: boolean | string,
}

export interface InputEmits {
  (e: 'update:prefix', value: PhoneCodeType): void
  (e: 'update:phoneNumber', value: string): void
}

const props = withDefaults(defineProps<UiPoneNumberProps>(), {
  label: 'Phone number',
  prefix: () => ({
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  }),
  phoneNumber: '',
  placeholder: 'Enter phone number',
  errorMessage: false,
});

const emit = defineEmits<InputEmits>();

const prefix = computed({
  get: () => props.prefix,
  set: (value) => emit('update:prefix', value),
});

const phoneNumber = computed({
  get: () => props.phoneNumber,
  set: (value) => emit('update:phoneNumber', value),
});
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-phone-number {
  --phone-number-dropdown-width: 320px;

  width: var(--phone-number-dropdown-width);

  &-form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    margin-top: var(--space-8);
  }
}
</style>
