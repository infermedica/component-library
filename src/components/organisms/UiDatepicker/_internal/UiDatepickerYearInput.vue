<template>
  <UiInput
    id="year"
    ref="input"
    :model-value="year"
    :class="{ 'ui-input--has-error': hasError || error }"
    :placeholder="translation.placeholderYear"
    :input-attrs="defaultProps.inputAttrs"
    @blur="standardizeYearFormat"
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

export interface DatepickerYearInputProps {
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
export type DatepickerYearInputAttrsProps = DefineAttrsProps<DatepickerYearInputProps, InputAttrsProps>;
export interface DatepickerYearInputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change-input', value: 'year'): void;
}

const props = withDefaults(defineProps<DatepickerYearInputProps>(), {
  modelValue: '',
  error: false,
  valid: false,
  inputAttrs: () => ({
    maxlength: '4',
    inputmode: 'numeric',
    autocomplete: 'off',
    pattern: '[0-9]*',
  }),
});
const defaultProps = computed(() => ({
  inputAttrs: {
    maxLength: '4',
    inputMode: 'numeric',
    autocomplete: 'off',
    pattern: '[0-9]*',
    ...props.inputAttrs,
  },
}));
const emit = defineEmits<DatepickerYearInputEmits>();
const translation = inject<DatepickerTranslation>('translation', { placeholderYear: 'YYYY' });
const unfulfilledYearError = inject<Ref<boolean>>('unfulfilledYear', ref(false));
const { numbersOnly } = useKeyValidation();
const year = computed({
  get: () => props.modelValue,
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});
const validationError = computed(() => (year.value.length === 4 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledYearError.value || props.error));
const handleInput = async (event: InputEvent) => {
  unfulfilledYearError.value = false;
  const {
    data, target,
  } = event;
  const { value } = target as HTMLInputElement;
  year.value = value;
  await nextTick();
  if (data && value.length === 4 && props.valid) {
    emit('change-input', 'year');
  }
};
const standardizeYearFormat = () => {
  if (year.value.length > 0 && year.value.length < 4) unfulfilledYearError.value = true;
};

const input = ref(null);
</script>
