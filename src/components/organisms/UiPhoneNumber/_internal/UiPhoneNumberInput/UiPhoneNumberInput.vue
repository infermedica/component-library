<template>
  <UiFormField
    id="ui-phone-number-form-field"
    :error-message="errorMessage"
    class="ui-phone-number-prefix-form-field"
  >
    <template #default>
      <UiInput
        v-model="phoneNumber"
        :class="[
          'ui-phone-number-prefix-form-field__input',
          { 'ui-input--has-error': errorMessage },
        ]"
        :placeholder="placeholder"
      >
        <template #input>
          <input
            v-keyboard-focus
            v-bind="inputAttrs"
            :value="phoneNumber"
            class="ui-input__input"
            @keydown="keyValidation"
            @input="inputHandler($event)"
          />
        </template>
      </UiInput>
    </template>
  </UiFormField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { keyboardFocus as vKeyboardFocus } from '../../../../../utilities/directives';
import { useKeyValidation } from '../../../../../composable';
import UiInput from '../../../../atoms/UiInput/UiInput.vue';
import UiFormField from '../../../../molecules/UiFormField/UiFormField.vue';

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
   * Use this props to set alert message
   */
  errorMessage?: boolean | string;
}

const props = withDefaults(defineProps<UiPhoneNumberInputProps>(), {
  modelValue: '',
  placeholder: '',
  id: '',
  type: 'text',
  errorMessage: false,
});

const emit = defineEmits([ 'update:modelValue' ]);

const inputAttrs = computed(() => ({
  id: props.id,
  placeholder: props.placeholder,
}));

const phoneNumber = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const { numbersOnly } = useKeyValidation();

const keyValidation = (event: KeyboardEvent) => {
  switch (props.type) {
    case 'number':
      numbersOnly(event);
      break;
    default:
  }
};

const inputHandler = (event: Event) => {
  const el = event.target as HTMLInputElement;
  phoneNumber.value = el.value;
};

</script>

<style lang="scss">
.ui-phone-number-prefix-form-field{
  &__input {
    margin-bottom: var(--space-8);
  }
}
</style>
