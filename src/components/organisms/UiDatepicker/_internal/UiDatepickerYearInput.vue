<template>
  <UiInput
    id="year"
    v-model="year"
    :class="{ 'ui-input--has-error': hasError }"
    :placeholder="translation.placeholderYear"
    maxlength="4"
    @blur="standardizeYearFormat"
    @input="checkYear"
    @keydown="numbersOnly"
  />
</template>

<script>
import {
  computed,
  inject,
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
    const { numbersOnly } = useKeyValidation();

    const year = computed({
      get: () => (`${props.modelValue}`),
      set: (value) => { emit('update:modelValue', value); },
    });

    const validationError = computed(() => (year.value.length === 4 && !props.valid));
    const hasError = computed(() => (validationError.value || props.error));

    function checkYear(event) {
      const inputValue = event.data;
      if (inputValue && year.value.length === 4 && props.valid) {
        emit('change-input');
      }
    }

    function standardizeYearFormat() {
      if (year.value.length !== 4) year.value = '';
    }

    return {
      translation,
      year,
      checkYear,
      hasError,
      numbersOnly,
      standardizeYearFormat,
    };
  },
};
</script>
