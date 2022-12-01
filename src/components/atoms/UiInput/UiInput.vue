<template>
  <div
    class="ui-input"
    v-bind="attrs"
  >
    <div class="ui-input__outline">
      <!-- @slot Use this slot to replace input template. -->
      <slot
        name="input"
        v-bind="{
          inputAttrs: defaultProps.inputAttrs,
          input: inputHandler,
          value: modelValue,
          validation: keyValidation
        }"
      >
        <input
          v-keyboard-focus
          v-bind="defaultProps.inputAttrs"
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
import { computed } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import type { PropsAttrs } from '../../../types/attrs';
import UiText from '../UiText/UiText.vue';
import useAttributes from '../../../composable/useAttributes';
import useKeyValidation from '../../../composable/useKeyValidation';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';

const props = defineProps({
  /**
   * Use this props to set input placeholder.
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set input type.
   */
  type: {
    type: String,
    default: 'text',
  },
  /**
   * Use this props to disabled input.
   * Remember to use `ui-input--is-disabled` class to style disabled input.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
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
   * Use this props to pass attrs for suffix UiText.
   */
  textSuffixAttrs: {
    type: Object,
    default: () => ({ tag: 'span' }),
  },
  /**
   * Use this props to pass attrs for input element.
   */
  inputAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string): void
}>();
const {
  attrs, listeners,
} = useAttributes();
const defaultProps = computed(() => ({
  textSuffixAttrs: {
    tag: 'span' as HTMLTag,
    ...props.textSuffixAttrs,
  },
  inputAttrs: {
    type: props.type,
    placeholder: props.placeholder,
    disabled: props.disabled,
    ...listeners.value,
    ...props.inputAttrs,
  },
}));
const { numbersOnly } = useKeyValidation();
function keyValidation(event: KeyboardEvent): void {
  switch (props.type) {
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
      @include mixins.use-logical($element + "-hover", border-color, var(--color-border-strong-hover));
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
    @include mixins.use-logical($element, padding, var(--space-12) var(--space-16));
    @include mixins.use-logical($element, border, 0);

    width: 100%;
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
    @include mixins.use-logical($element + "-aside", margin, 0 var(--space-16) 0 calc(var(--space-4) * -1));

    &.ui-button {
      @include mixins.use-logical($element + "-aside", margin, 0 var(--space-12) 0 calc(var(--space-4) * -1));
    }
  }

  &--is-disabled {
    &::after {
      @include mixins.use-logical($element, border-color, var(--color-border-subtle));
    }

    @include mixins.hover {
      &::after {
        @include mixins.use-logical($element, border-color, var(--color-border-subtle));
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
      @include mixins.use-logical($element, border-color, var(--color-border-error-strong));
    }

    @include mixins.hover {
      &::after {
        @include mixins.use-logical($element + "-hover", border-color, var(--color-border-error-strong-hover));
      }
    }
  }
}
</style>
