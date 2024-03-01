<template>
  <UiInput
    v-model="phoneNumber"
    :class="[
      'ui-phone-number-input',
      { 'ui-input--has-error': hasError },
    ]"
    :input-attrs="inputAttrs"
    :type="type"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiInput from '../../../../atoms/UiInput/UiInput.vue';
import type { DefineAttrsProps } from '../../../../../types';
import type { InputAttrsProps } from '../../../../atoms/UiInput/UiInput.vue';

export interface PhoneNumberInputProps {
  /**
   * Use this props to set phone number.
   */
  modelValue?: string,
  /**
   * Use this props to set input placeholder.
   */
  placeholder?: string,
  /**
   * Use this props to set input id.
   */
  id?: string,
  /**
   * Use this props to set input type.
   */
   type?: string;
  /**
   * Use this props to set error state.
   */
  hasError?: boolean;
}
export type PhoneNumberInputAttrsProps = DefineAttrsProps<PhoneNumberInputProps>

const props = withDefaults(defineProps<PhoneNumberInputProps>(), {
  modelValue: '',
  placeholder: '',
  id: '',
  type: 'tel',
  hasError: false,
});
const emit = defineEmits([ 'update:modelValue' ]);
const phoneNumber = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const inputAttrs = computed<InputAttrsProps>(() => ({
  id: props.id,
  placeholder: props.placeholder,
  inputmode: 'numeric',
}));

</script>
