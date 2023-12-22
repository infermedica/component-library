<template>
  <UiFormField
    id="ui-phone-number-form-field"
    :error-message="errorMessage"
    class="ui-phone-number-prefix-form-field"
  >
    <template #default="{ id }">
      <UiInput
        :id="id"
        v-model="phoneNumber"
        :class="[
          'ui-phone-number-prefix-form-field__input',
          { 'ui-input--has-error': errorMessage },
        ]"
        :placeholder="placeholder"
      />
    </template>
  </UiFormField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiInput from '../../../../atoms/UiInput/UiInput.vue';
import UiFormField from '../../../../molecules/UiFormField/UiFormField.vue';
import { type InputEmits } from '../../../../atoms/UiInput/UiInput.vue';

export interface UiPhoneNumberInputProps {
  /**
   * Use this props to set phone number.
   */
  modelValue?: string,
  /**
   * Use this props to set input placeholder.
   */
  placeholder?: string,
}

const props = withDefaults(defineProps<UiPhoneNumberInputProps>(), {
  modelValue: '',
  placeholder: '',
});

const emit = defineEmits<InputEmits>();

const phoneNumber = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const errorMessage = false;
// const errorMessage = 'Please enter the phone number';
</script>

<style lang="scss">
.ui-phone-number-prefix-form-field{

  &__input {
    margin-bottom: var(--space-8);
  }
}
</style>
