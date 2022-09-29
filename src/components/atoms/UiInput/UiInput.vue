<template>
  <div
    class="ui-input"
    v-bind="getRootAttrs($attrs)"
  >
    <div class="ui-input__outline">
      <!-- @slot Use this slot to replace input template. -->
      <slot
        name="input"
        v-bind="{
          inputAttrs: getInputAttrs($attrs),
          input: inputHandler,
          value: modelValue,
          validation: keyValidation
        }"
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
      v-bind="{
        suffix,
        textSuffixAttrs: defaultProps.textSuffixAttrs
      }"
    >
      <UiText
        v-if="suffix"
        v-bind="defaultProps.textSuffixAttrs"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </slot>
  </div>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import UiText from '../UiText/UiText.vue';
import useInput from '../../../composable/useInput';
import useKeyValidation from '../../../composable/useKeyValidation';
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
   * Use this props to set suffix.
   */
  suffix: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for suffix UiText
   */
  textSuffixAttrs: {
    type: Object,
    default: () => ({ tag: 'span' }),
  },
});
const defaultProps = computed(() => ({
  textSuffixAttrs: {
    tag: 'span',
    ...props.textSuffixAttrs,
  },
}));
const emit = defineEmits<{(e: 'update:modelValue', value: string): void
}>();
const attrs = useAttrs();
const {
  getRootAttrs, getInputAttrs,
} = useInput();
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
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-input {
  $this: &;
  $element: input;

  @include mixins.inner-border($element, $width: 1px, $radius: var(--border-radius-form));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 150ms ease-in-out;

  @include mixins.hover {
    &::after {
      border-color: functions.var($element + "-hover", border-color, var(--color-border-strong-hover));
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
    @include mixins.font($element, body-1);

    width: 100%;
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
    margin: functions.var($element + "-aside", margin, 0 var(--space-16) 0 calc(var(--space-4) * -1));

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-aside", margin, 0 calc(var(--space-4) * -1) 0 var(--space-16));
    }

    &.ui-button {
      margin: functions.var($element + "-aside", margin, 0 var(--space-12) 0 calc(var(--space-4) * -1));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-aside", margin, 0 calc(var(--space-4) * -1) 0 var(--space-12));
      }
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

    #{$this}__input {
      caret-color: functions.var($element, caret-color, var(--color-gray-400));
      color: functions.var($element, color, var(--color-text-disabled));
      cursor: not-allowed;

      &::placeholder {
        color: functions.var($element + "-placeholder", color, var(--color-text-disabled));
      }
    }

    #{$this}__aside {
      color: functions.var($element + "-aside", color, var(--color-text-disabled));
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
