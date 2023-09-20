<template>
  <UiText
    class="ui-text--body-2-comfortable ui-text--theme-secondary ui-form-field__character-counter"
  >
    {{ length }}/{{ max }}
  </UiText>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
} from 'vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../../types/attrs';

export interface FormFieldCharacterCounterProps {
  /**
   * Use this props to pass value of input.
   */
  value?: string;
  /**
   * Use this props to set max of characters.
   */
  max?: number;
}
export type FormFieldCharacterCounterAttrsProps = DefineAttrsProps<FormFieldCharacterCounterProps>
export interface FormFieldCharacterCounterEmits {
  (e: 'error', value: string | null): void;
}

const props = withDefaults(defineProps<FormFieldCharacterCounterProps>(), {
  value: '',
  max: 240,
});
const length = computed(() => (props.value.length));
const emit = defineEmits<FormFieldCharacterCounterEmits>();
watch(
  length,
  (size) => {
    if (size > props.max) {
      emit('error', 'max length exceeds');
      return;
    }
    emit('error', null);
  },
  { immediate: true },
);
</script>
