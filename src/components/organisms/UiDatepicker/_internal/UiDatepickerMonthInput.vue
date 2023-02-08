<template>
  <UiInput
    id="month"
    v-model="month"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderMonth"
    :input-attrs="defaultProps.inputAttrs"
    @blur="standardizeMonthFormat"
    @input="checkMonth"
    @keydown="numbersOnly"
  />
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  ref,
} from 'vue';
import type { Ref } from 'vue';
import { removeNonDigits } from '../../../../utilities/helpers/index';
import UiInput from '../../../atoms/UiInput/UiInput.vue';
import type { InputAttrsProps } from '../../../atoms/UiInput/UiInput.vue';
import useKeyValidation from '../../../../composable/useKeyValidation';
import type { DatepickerTranslation } from '../UiDatepicker.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface DatepickerMonthInputProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: string;
  /**
   * Use this props to set input in error state manually
   */
  error?: boolean;
  /**
   * Use this props to set input value validation status
   */
  valid?: boolean;
  /**
   *  Use this props to pass attrs to input.
   */
  inputAttrs?: InputAttrsProps['inputAttrs'],
}
export type DatepickerMonthInputAttrsProps = DefineAttrsProps<DatepickerMonthInputProps, InputAttrsProps>;
export interface DatepickerMonthEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change-input', value: 'month'): void
}

const props = withDefaults(defineProps<DatepickerMonthInputProps>(), {
  modelValue: '',
  error: false,
  valid: false,
  inputAttrs: () => ({
    maxlength: '2',
    inputmode: 'numeric',
    autocomplete: 'off',
    pattern: '[0-9]*',
  }),
});
const defaultProps = computed(() => ({
  inputAttrs: {
    maxLength: '2',
    inputMode: 'numeric',
    autocomplete: 'off',
    pattern: '[0-9]*',
    ...props.inputAttrs,
  },
}));
const emit = defineEmits<DatepickerMonthEmits>();
const translation = inject<DatepickerTranslation>('translation', { placeholderMonth: 'MM' });
const unfulfilledMonthError = inject<Ref<boolean>>('unfulfilledMonth', ref(false));
const { numbersOnly } = useKeyValidation();
const month = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});
const validationError = computed(() => (month.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledMonthError.value || props.error));
const checkMonth = async ({ data }: InputEvent) => {
  unfulfilledMonthError.value = false;
  await nextTick();
  if (data && (![
    '0',
    '1',
  ].includes(data) || month.value.length === 2) && props.valid) {
    emit('change-input', 'month');
  }
};
const standardizeMonthFormat = () => {
  if (month.value.length === 1) {
    if (month.value !== '0') {
      month.value = `0${month.value}`;
    } else {
      unfulfilledMonthError.value = true;
    }
  }
};
</script>
