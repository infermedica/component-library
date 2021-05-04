<template>
  <UiInput
    v-model="day"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderDay"
    maxlength="2"
    @blur="standardizeDayFormat"
    @input="checkDay"
    @keydown="numbersOnly"
  />
</template>

<script>
import {
  computed,
  inject,
  nextTick,
} from 'vue';
import UiInput from '../../../atoms/UiInput/UiInput.vue';
import useKeyValidation from '../../../../composable/useKeyValidation';

export default {
  components: {
    UiInput,
  },
  props: {
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
  },
  emits: ['update:modelValue', 'change-input'],
  setup(props, { emit }) {
    const translation = inject('translation');
    const unfulfilledDayError = inject('unfulfilledDay');
    const { numbersOnly } = useKeyValidation();

    const day = computed({
      get: () => (`${props.modelValue}`),
      set: (value) => { emit('update:modelValue', value); },
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

    return {
      translation,
      day,
      checkDay,
      hasError,
      numbersOnly,
      standardizeDayFormat,
    };
  },
};
</script>
