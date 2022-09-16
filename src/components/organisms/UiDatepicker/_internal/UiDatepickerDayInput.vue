<template>
  <UiInput
    v-model="day"
    :class="{
      'ui-input--has-error': hasError
    }"
    :placeholder="translation.placeholderDay"
    maxlength="2"
    inputmode="numeric"
    pattern="[0-9]*"
    autocomplete="off"
    @blur="standardizeDayFormat"
    @input="checkDay($event as InputEvent)"
    @keydown="numbersOnly"
  />
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
} from 'vue';
import type { Ref } from 'vue';
import { removeNonDigits } from '../../../../utilities/helpers/index.ts';
import UiInput from '../../../atoms/UiInput/UiInput.vue';
import useKeyValidation from '../../../../composable/useKeyValidation';
import type { DatepickerTranslation } from '../UiDatepicker.vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set input in error state manually
   */
  error: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to set input value validation status
   */
  valid: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{(e:'update:modelValue', value: string):void, (e:'change-input', value: 'day'): void}>();
const translation = inject('translation') as DatepickerTranslation;
const unfulfilledDayError = inject('unfulfilledDay') as Ref<boolean>;
const { numbersOnly } = useKeyValidation();
const day = computed({
  get: () => (`${props.modelValue}`),
  set: (value: string) => { emit('update:modelValue', removeNonDigits(value)); },
});
const validationError = computed(() => (day.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledDayError.value || props.error));
async function checkDay(event: InputEvent): Promise<void> {
  unfulfilledDayError.value = false;
  const inputValue = event.data;
  await nextTick();
  if (inputValue && (!['0', '1', '2', '3'].includes(inputValue) || day.value.length === 2) && props.valid) {
    emit('change-input', 'day');
  }
}
function standardizeDayFormat(): void {
  if (day.value.length === 1) {
    if (day.value !== '0') {
      day.value = `0${day.value}`;
    } else {
      unfulfilledDayError.value = true;
    }
  }
}
</script>
