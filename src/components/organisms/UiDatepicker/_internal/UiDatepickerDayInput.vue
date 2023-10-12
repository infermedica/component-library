<template>
  <UiInput
    id="day"
    ref="input"
    :model-value="day"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderDay"
    :input-attrs="defaultProps.inputAttrs"
    @blur="standardizeDayFormat"
    @input="handleInput($event as InputEvent)"
    @keydown="numbersOnly"
  />
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  ref,
  type Ref,
} from 'vue';
import { removeNonDigits } from '../../../../utilities/helpers';
import UiInput from '../../../atoms/UiInput/UiInput.vue';
import type { InputAttrsProps } from '../../../atoms/UiInput/UiInput.vue';
import { useKeyValidation } from '../../../../composable';
import type { DatepickerTranslation } from '../UiDatepicker.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface DatepickerDayInputProps {
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
  inputAttrs?: InputAttrsProps['inputAttrs'];
}
export type DatepickerDayInputAttrsProps = DefineAttrsProps<DatepickerDayInputProps, InputAttrsProps>;
export interface DatepickerDayInputEmits {
  (e:'update:modelValue', value: string): void;
  (e:'change-input', value: 'day'): void;
}

const props = withDefaults(defineProps<DatepickerDayInputProps>(), {
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
const emit = defineEmits<DatepickerDayInputEmits>();
const translation = inject<DatepickerTranslation>('translation', { placeholderDay: 'DD' });
const unfulfilledDayError = inject<Ref<boolean>>('unfulfilledDay', ref(false));
const { numbersOnly } = useKeyValidation();
const day = computed({
  get: () => props.modelValue,
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});
const validationError = computed(() => (day.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledDayError.value || props.error));
const handleInput = async (event: InputEvent) => {
  unfulfilledDayError.value = false;
  const {
    data, target,
  } = event;
  const { value } = target as HTMLInputElement;
  day.value = value;
  await nextTick();
  if (data && (![
    '0',
    '1',
    '2',
    '3',
  ].includes(data) || value.length === 2) && props.valid) {
    emit('change-input', 'day');
  }
};
const standardizeDayFormat = () => {
  if (day.value.length === 1) {
    if (day.value !== '0') {
      day.value = `0${day.value}`;
    } else {
      unfulfilledDayError.value = true;
    }
  }
};

const input = ref(null);
</script>
