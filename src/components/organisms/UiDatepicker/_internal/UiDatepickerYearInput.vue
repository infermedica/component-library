<template>
  <UiInput
    id="year"
    v-model="year"
    :class="{ 'ui-input--has-error': hasError || error }"
    :placeholder="translation.placeholderYear"
    maxlength="4"
    inputmode="numeric"
    pattern="[0-9]*"
    autocomplete="off"
    @blur="standardizeYearFormat"
    @input="checkYear"
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
const unfulfilledYearError = inject('unfulfilledYear');
const { numbersOnly } = useKeyValidation();

const year = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});

const validationError = computed(() => (year.value.length === 4 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledYearError.value || props.error));

async function checkYear(event) {
  unfulfilledYearError.value = false;
  const inputValue = event.data;
  await nextTick();
  if (inputValue && year.value.length === 4 && props.valid) {
    emit('change-input', 'year');
  }
}

function standardizeYearFormat() {
  if (year.value.length > 0 && year.value.length < 4) unfulfilledYearError.value = true;
}
</script>
