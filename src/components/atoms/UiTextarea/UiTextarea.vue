<template>
  <div
    class="ui-textarea"
    v-bind="getRootAttrs($attrs)"
  >
    <textarea
      v-keyboard-focus
      v-bind="getInputAttrs($attrs)"
      :value="modelValue"
      :style="{
        resize: resizeValue
      }"
      class="ui-textarea__textarea"
      @input="inputHandler($event)"
    />
  </div>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
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
    type: [Boolean, String] as PropType<boolean | 'horizontal' | 'vertical'>,
    optional: true,
    default: false,
  },
});
const emit = defineEmits<{(e:'update:modelValue', value:string):void}>();
const {
  getRootAttrs, getInputAttrs,
} = useInput();
function inputHandler(event: Event) {
  const el = event.target as HTMLInputElement;
  emit('update:modelValue', el.value);
}
const resizeValue = computed<'both' | 'none' | 'vertical' | 'horizontal'>(() => {
  if (typeof props.resize !== 'boolean') {
    return props.resize;
  }
  return props.resize ? 'both' : 'none';
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-textarea {
  $this: &;
  $element: textarea;

  @include mixins.inner-border($element, $radius: var(--border-radius-form));

  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 150ms ease-in-out;

  @include mixins.hover {
    &::after {
      border-color: functions.var($element + "-hover", border-color, var(--color-border-strong-hover));
    }
  }

  &:focus-within {
    box-shadow: var(--focus-outer);
  }

  &__textarea {
    @include mixins.font($element, body-1);

    flex: 1;
    padding: functions.var($element, padding, var(--space-12) var(--space-16));
    border: 0;
    background: transparent;
    border-radius: inherit;
    caret-color: functions.var($element, caret-color, var(--color-blue-500));
    color: functions.var($element, color, var(--color-text-body));
    outline: none;

    &::placeholder {
      color: functions.var($element + "-placeholder", color, var(--color-text-dimmed));
      font: inherit;
      letter-spacing: inherit;
    }
  }

  &--is-disabled {
    &::after {
      border-color: functions.var($element, border-color, var(--color-border-subtle));
    }

    @include mixins.hover {
      &::after {
        border-color: functions.var($element, border-color, var(--color-border-subtle));
      }
    }

    #{$this}__textarea {
      caret-color: functions.var($element, caret-color, var(--color-gray-400));
      color: functions.var($element, color, var(--color-text-disabled));
      cursor: not-allowed;

      &::placeholder {
        color: functions.var($element + "-placeholder", color, var(--color-text-disabled));
      }
    }
  }

  &--has-error {
    &::after {
      border-color: functions.var($element, border-color, var(--color-border-error-strong));
    }

    @include mixins.hover {
      &::after {
        border-color: functions.var($element + "-hover", border-color, var(--color-border-error-strong-hover));
      }
    }
  }
}
</style>
