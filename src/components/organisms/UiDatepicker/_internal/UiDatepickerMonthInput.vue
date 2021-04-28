<template>
  <UiInput
    id="month"
    v-model="month"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderMonth"
    maxlength="2"
    @blur="standardizeMonthFormat"
    @input="checkMonth"
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
        emit('change-input');
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

    return {
      translation,
      month,
      checkMonth,
      hasError,
      numbersOnly,
      standardizeMonthFormat,
    };
  },
};
</script>
