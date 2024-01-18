<template>
  <UiInput
    v-model="phoneNumber"
    :class="[
      'ui-phone-number-input',
      { 'ui-input--has-error': error },
    ]"
    :input-attrs="{
      id: id,
      placeholder: placeholder,
      inputmode: 'numeric',
    }"
    :type="type"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiInput from '../../../../atoms/UiInput/UiInput.vue';

export interface UiPhoneNumberInputProps {
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
  error?: boolean | string;
}

const props = withDefaults(defineProps<UiPhoneNumberInputProps>(), {
  modelValue: '',
  placeholder: '',
  id: '',
  type: 'tel',
  error: false,
});

const emit = defineEmits([ 'update:modelValue' ]);

const phoneNumber = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

</script>
