<template>
  <div
    class="ui-input"
    v-bind="getRootAttrs($attrs)"
  >
    <div class="ui-input__outline">
      <!-- @slot Use this slot to replace input template. -->
      <slot
        name="input"
        v-bind="{attrs: getInputAttrs($attrs), input: inputHandler, value: modelValue, validation: keyValidation}"
      >
        <input
          v-keyboard-focus
          v-bind="getInputAttrs($attrs)"
          :value="modelValue"
          class="ui-input__input"
          @keydown="keyValidation"
          @input="inputHandler($event)"
        >
      </slot>
    </div>
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

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
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
const emit = defineEmits<{(e: 'update:modelValue', value: string): void
}>();
const attrs = useAttrs();
const { getRootAttrs, getInputAttrs } = useInput();
const { numbersOnly } = useKeyValidation();
function keyValidation(event: Event): void {
  switch (attrs.type) {
    case 'number':
      numbersOnly(event);
      break;
    default:
  }
}
function inputHandler(event: Event): void {
  const el = event.target as HTMLInputElement;
  emit('update:modelValue', el.value);
}
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-input {
  $this: &;
  $element: input;

  @include inner-border($element, $width: 1px, $radius: var(--border-radius-form));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 150ms ease-in-out;

  @include hover {
    &::after {
      border-color: css-var($element + "-hover", border-color, var(--color-border-strong-hover));
    }
  }

  &__outline {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: inherit;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      box-shadow: var(--focus-outer);
      content: "";
      opacity: 0;
      pointer-events: none;
    }

    &:focus-within {
      &::after {
        opacity: 1;
      }
    }
  }

  &__input {
    @include font($element, body-1);

    width: 100%;
    padding: css-var($element, padding, var(--space-12) var(--space-16));
    border: 0;
    background: transparent;
    border-radius: inherit;
    caret-color: css-var($element, caret-color, var(--color-blue-500));
    color: css-var($element, color, var(--color-text-body));
    outline: none;

    &::placeholder {
      color: css-var($element + "-placeholder", color, var(--color-text-dimmed));
      font: inherit;
      letter-spacing: inherit;
    }

    @at-root {
      input::-webkit-search-decoration,
      input::-webkit-search-cancel-button,
      input::-webkit-search-results-button,
      input::-webkit-search-results-decoration {
        display: none;
      }

      input::-webkit-inner-spin-button,
      input::-webkit-outer-spin-button {
        appearance: none;
      }

      input[type="number"] {
        appearance: textfield;
      }
    }
  }

  &__aside {
    margin: css-var($element + "-aside", margin, 0 var(--space-16) 0 calc(var(--space-4) * -1));

    [dir="rtl"] & {
      margin: css-var($element + "-rtl-aside", margin, 0 calc(var(--space-4) * -1) 0 var(--space-16));
    }

    &.ui-button {
      margin: css-var($element + "-aside", margin, 0 var(--space-12) 0 calc(var(--space-4) * -1));

      [dir="rtl"] & {
        margin: css-var($element + "-rtl-aside", margin, 0 calc(var(--space-4) * -1) 0 var(--space-12));
      }
    }
  }

  &--is-disabled {
    &::after {
      border-color: css-var($element, border-color, var(--color-border-subtle));
    }

    @include hover {
      &::after {
        border-color: css-var($element, border-color, var(--color-border-subtle));
      }
    }

    #{$this}__input {
      caret-color: css-var($element, caret-color, var(--color-gray-400));
      color: css-var($element, color, var(--color-text-disabled));
      cursor: not-allowed;

      &::placeholder {
        color: css-var($element + "-placeholder", color, var(--color-text-disabled));
      }
    }

    #{$this}__aside {
      color: css-var($element + "-aside", color, var(--color-text-disabled));
    }
  }

  &--has-error {
    &::after {
      border-color: css-var($element, border-color, var(--color-border-error-strong));
    }

    @include hover {
      &::after {
        border-color: css-var($element + "-hover", border-color, var(--color-border-error-strong-hover));
      }
    }
  }
}
</style>
