<template>
  <div
    class="ui-input"
    v-bind="getRootAttrs($attrs)"
  >
    <!-- @slot Use this slot to replace input template. -->
    <slot
      name="input"
      v-bind="{attrs: getInputAttrs($attrs), input: inputHandler, value: modelValue, validation: keyValidation}"
    >
      <input
        v-keyboard-focus
        v-bind="getInputAttrs($attrs)"
        :value="modelValue"
        class="ui-input__element"
        @keydown="keyValidation"
        @input="inputHandler($event.target.value)"
      >
    </slot>
    <!-- @slot Use this slot to place aside element. -->
    <slot
      name="aside"
      v-bind="{suffix}"
    >
      <UiText
        v-if="suffix"
        tag="span"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { useAttrs } from 'vue';
import UiText from '../UiText/UiText.vue';
import useInput from '../../../composable/useInput';
import useKeyValidation from '../../../composable/useKeyValidation';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

defineProps({
  /**
   * Use this props to set suffix.
   */
  suffix: {
    type: String,
    default: '',
  },
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const { getRootAttrs, getInputAttrs } = useInput();
const { numbersOnly } = useKeyValidation();
function keyValidation(event) {
  switch (attrs.type) {
    case 'number':
      numbersOnly(event);
      break;
    default:
  }
}
function inputHandler(value) {
  emit('update:modelValue', value);
}
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-input {
  @include inner-border($element: input, $width: 1px, $radius: var(--border-radius-form));

  $this: &;

  display: inline-flex;
  overflow: hidden;
  align-items: center;
  background-color: var(--input-background-color, var(--color-background-white));
  color: var(--input-color, var(--color-text-body));

  &:focus-within {
    --input-border-color: var(--input-focus-border-color, var(--color-border-strong));

    box-shadow: var(--focus-outer);
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      --input-border-color: var(--input-hover-border-color, var(--color-border-strong-hover));

      &:focus-within {
        --input-hover-border-color: var(--input-focus-border-color);
      }
    }
  }

  &__element {
    @include font(input-element, body-1);

    width: 100%;
    padding: var(--input-padding, var(--space-12) var(--space-16));
    border: 0;
    background-color: transparent; // override iOS default
    caret-color: var(--input-caret-color, var(--color-blue-500));
    color: var(--input-color, var(--color-text-body));
    outline: none;

    &::placeholder {
      color: var(--input-placeholder-color, var(--color-text-dimmed));
      font: inherit;
      letter-spacing: inherit;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &:disabled {
      background: var(--input-background-color, var(--color-background-white));
      cursor: not-allowed;
    }

    &[type="number"] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        margin: 0;
        appearance: none;
      }

      appearance: none;
    }
  }

  &__aside {
    @include font(input-aside, body-1, text);

    flex: none;
    margin: var(--input-aside-margin, 0 var(--space-16) 0 0);
    color: var(--input-suffix-color, var(--input-color), var(--color-text-body));

    [dir="rtl"] & {
      margin: var(--input-aside-margin, 0 0 0 var(--space-16));
    }
  }

  &--has-icon {
    --icon-size: var(--input-icon-size, 1.5rem);

    #{$this}__aside {
      --input-aside-margin: var(--input-aside-margin, 0 var(--space-12) 0 0);

      [dir="rtl"] & {
        --input-aside-margin: var(--input-aside-margin, 0 0 0 var(--space-12));
      }
    }
  }

  &--has-error {
    --input-color: var(--input-error-color, var(--color-text-body));
    --input-border-color: var(--input-error-border-color, var(--color-border-error-strong));
    --input-hover-border-color: var(--input-error-hover-border-color, var(--color-border-error-strong));
    --input-focus-border-color: var(--input-error-focus-border-color, var(--color-border-error-strong));
    --input-caret-color: var(--input-error-caret-color, var(--color-border-error-strong));
  }

  &--is-disabled {
    --input-placeholder-color: var(--color-text-disabled);
    --input-color: var(--input-disabled-color, var(--color-text-disabled));
    --input-border-color: var(--input-disabled-border-color, var(--color-border-subtle));
    --input-hover-border-color: var(--input-disabled-hover-border-color, var(--color-border-subtle));
    --input-focus-border-color: var(--input-disabled-focus-border-color, var(--color-border-subtle));
    --input-caret-color: var(--input-disabled-caret-color, var(--color-border-subtle));
    --icon-color: var(--color-icon-disabled);

    cursor: not-allowed;

    #{$this}__element {
      cursor: not-allowed;
    }
  }
}
</style>
