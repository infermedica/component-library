<template>
  <UiInput
    id="month"
    v-model="month"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderMonth"
    maxlength="2"
    inputmode="numeric"
    pattern="[0-9]*"
    autocomplete="off"
    @blur="standardizeMonthFormat"
    @input="checkMonth"
    @keydown="numbersOnly"
  />
</template>

<script setup>
import {
  computed,
  inject,
  nextTick,
} from 'vue';
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
const unfulfilledMonthError = inject('unfulfilledMonth');
const { numbersOnly } = useKeyValidation();

const month = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});

const validationError = computed(() => (month.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledMonthError.value || props.error));

async function checkMonth(event) {
  unfulfilledMonthError.value = false;
  const inputValue = event.data;
  await nextTick();
  if (inputValue && (!['0', '1'].includes(inputValue) || month.value.length === 2) && props.valid) {
    emit('change-input', 'month');
  }
}

function standardizeMonthFormat() {
  if (month.value.length === 1) {
    if (month.value !== '0') {
      month.value = `0${month.value}`;
    } else {
      unfulfilledMonthError.value = true;
    }
  }
}
</script>
