<template>
  <div
    class="ui-textarea"
    v-bind="getRootAttrs($attrs)"
  >
    <textarea
      v-keyboard-focus
      v-bind="getInputAttrs($attrs)"
      :value="modelValue"
      :style="{resize: resizeValue}"
      class="ui-textarea__element"
      @input="inputHandler($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from 'vue';
import useInput from '../../../composable/useInput';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * Use this props to enable resizing on textarea.
   * true - both direction resizing, false - disable resizing,
   * 'horizontal' - horizontal resizing only, 'vertical' - vertical resizing only
   */
  resize: {
    type: [Boolean, String],
    optional: true,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const { getRootAttrs, getInputAttrs } = useInput();
function inputHandler(value) {
  emit('update:modelValue', value);
}
const resizeValue = computed(() => {
  if (props.resize) {
    return typeof variable === 'boolean' ? 'both' : props.resize;
  }
  return 'none';
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-textarea {
  @include inner-border($element: textarea, $radius: var(--border-radius-form));

  $this: &;

  display: inline-flex;
  overflow: hidden;
  align-items: center;
  color: var(--textarea-color, var(--color-background-white));

  &:focus-within {
    --input-border-color: var(--input-focus-border-color, var(--color-border-strong));

    box-shadow: var(--focus-outer);
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      --textarea-border-color: var(--textarea-hover-border-color, var(--color-border-strong-hover));

      &:focus-within {
        --textarea-hover-border-color: var(--textarea-focus-border-color);
      }
    }
  }

  &__element {
    @include font(body-1);

    width: 100%;
    padding: var(--textarea-padding, var(--space-12) var(--space-16));
    border: 0;
    background-color: transparent; // override iOS default
    caret-color: var(--textarea-caret-color, var(--color-blue-500));
    color: var(--textarea-color, var(--color-text-body));
    outline: none;

    &::placeholder {
      @include font(body-1);

      color: var(--texatarea-placeholder-color, var(--color-text-dimmed));
    }
  }

  &--has-error {
    --textarea-border-color: var(--textarea-error-border-color, var(--color-border-error-strong));
    --textarea-hover-border-color: var(--textarea-error-hover-border-color, var(--color-border-error-strong));
    --textarea-focus-border-color: var(--color-border-error-strong);
  }

  &--is-disabled {
    --textarea-color: var(--textarea-disabled-color, var(--color-text-disabled));
    --textarea-placeholder-color: var(--textarea-disabled-placeholder-color, var(--color-text-disabled));
    --textarea-border-color: var(--textarea-disabled-border-color, var(--color-border-subtle));
    --textarea-hover-border-color: var(--textarea-disabled-hover-border-color, var(--color-border-subtle));
    --textarea-focus-border-color: var(--color-border-subtle);
    --textarea-caret-color: var(--textarea-disabled-caret-color, var(--color-border-subtle));

    cursor: not-allowed;
  }
}
</style>
