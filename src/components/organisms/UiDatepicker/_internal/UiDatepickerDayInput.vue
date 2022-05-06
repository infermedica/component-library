<template>
  <UiInput
    v-model="day"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderDay"
    maxlength="2"
    inputmode="numeric"
    pattern="[0-9]*"
    autocomplete="off"
    @blur="standardizeDayFormat"
    @input="checkDay"
    @keydown="numbersOnly"
  />
</template>

<script setup>
import {
  computed,
  inject,
  nextTick,
} from 'vue';
import { removeNonDigits } from '../../../../utilities/helpers/remove-non-digits';
import UiInput from '../../../atoms/UiInput/UiInput.vue';
import useKeyValidation from '../../../../composable/useKeyValidation';

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
const emit = defineEmits(['update:modelValue', 'change-input']);
const translation = inject('translation');
const unfulfilledDayError = inject('unfulfilledDay');
const { numbersOnly } = useKeyValidation();

const day = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});

const validationError = computed(() => (day.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledDayError.value || props.error));

async function checkDay(event) {
  unfulfilledDayError.value = false;
  const inputValue = event.data;
  await nextTick();
  if (inputValue && (!['0', '1', '2', '3'].includes(inputValue) || day.value.length === 2) && props.valid) {
    emit('change-input', 'day');
  }
}

function standardizeDayFormat() {
  if (day.value.length === 1) {
    if (day.value !== '0') {
      day.value = `0${day.value}`;
    } else {
      unfulfilledDayError.value = true;
    }
  }
}
</script>
