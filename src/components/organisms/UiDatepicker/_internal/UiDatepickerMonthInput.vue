<template>
  <UiInput
    id="month"
    v-model="month"
    :class="{
      'ui-input--has-error': hasError
    }"
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
const emit = defineEmits<{(e: 'update:modelValue', value: string): void, (e: 'change-input', value: 'month'): void}>();
const translation = inject('translation') as DatepickerTranslation;
const unfulfilledMonthError = inject('unfulfilledMonth') as Ref<boolean>;
const {
  numbersOnly,
} = useKeyValidation();
const month = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', removeNonDigits(value)); },
});
const validationError = computed(() => (month.value.length === 2 && !props.valid));
const hasError = computed(() => (validationError.value || unfulfilledMonthError.value || props.error));
async function checkMonth(event: Event): Promise<void> {
  unfulfilledMonthError.value = false;
  const inputValue = (event as InputEvent).data;
  await nextTick();
  if (inputValue && (!['0', '1'].includes(inputValue) || month.value.length === 2) && props.valid) {
    emit('change-input', 'month');
  }
}
function standardizeMonthFormat(): void {
  if (month.value.length === 1) {
    if (month.value !== '0') {
      month.value = `0${month.value}`;
    } else {
      unfulfilledMonthError.value = true;
    }
  }
}
</script>
