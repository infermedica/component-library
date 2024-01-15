<template>
  <UiInput
    v-model="phoneNumber"
    :class="[
      'ui-phone-number-input',
      { 'ui-input--has-error': error },
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

<script setup lang="ts">
import {
  computed,
  type InputHTMLAttributes,
} from 'vue';
import { keyboardFocus as vKeyboardFocus } from '../../../../../utilities/directives';
import { useKeyValidation } from '../../../../../composable';
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

const inputAttrs = computed<InputHTMLAttributes>(() => ({
  id: props.id,
  placeholder: props.placeholder,
  inputmode: 'numeric',
}));

const phoneNumber = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const { numbersOnly } = useKeyValidation();

const keyValidation = (event: KeyboardEvent) => {
  switch (props.type) {
    case 'tel':
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
