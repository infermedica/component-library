<template>
  <div
    class="ui-input"
    v-bind="attrs"
  >
    <div
      class="ui-input__outline"
      v-bind="outlineAttrs"
    >
      <!-- @slot Use this slot to replace input template. -->
      <slot
        name="input"
        v-bind="{
          inputAttrs: defaultProps.inputAttrs,
          input: inputHandler,
          value: modelValue,
          validation: keyValidation,
        }"
      >
        <input
          ref="input"
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
        textSuffixAttrs: defaultProps.textSuffixAttrs,
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
  ref,
  computed,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from 'vue';
import {
  useAttributes,
  useKeyValidation,
} from '../../../composable';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';
import UiText from '../UiText/UiText.vue';
import type { TextAttrsProps } from '../UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../types';

export type InputModelValue = string;
export interface InputProps {
  /**
   * Use this props to set input placeholder.
   */
  placeholder?: string;
  /**
   * Use this props to set input type.
   */
  type?: string;
  /**
   * Use this props to disabled input.
   * Remember to use `ui-input--is-disabled` class to style disabled input.
   */
  disabled?: boolean;
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: InputModelValue;
  /**
   * Use this props to set suffix.
   */
  suffix?: string;
  /**
   * Use this props to pass attrs for outline element.
   */
  outlineAttrs?: HTMLAttributes;
  /**
   * Use this props to pass attrs for suffix UiText.
   */
  textSuffixAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for input element.
   */
  inputAttrs?: DefineAttrsProps<InputProps, InputHTMLAttributes>;
}
export type InputAttrsProps = DefineAttrsProps<InputProps>;
export interface InputEmits {
  (e: 'update:modelValue', value: InputModelValue): void
}

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: '',
  type: 'text',
  disabled: false,
  modelValue: '',
  suffix: '',
  outlineAttrs: () => ({}),
  textSuffixAttrs: () => ({ tag: 'span' }),
  inputAttrs: () => ({}),
});
const defaultProps = computed(() => {
  const tag: TextAttrsProps['tag'] = 'span';
  return {
    textSuffixAttrs: {
      tag,
      ...props.textSuffixAttrs,
    },
    inputAttrs: {
      type: props.type,
      placeholder: props.placeholder,
      disabled: props.disabled,
      ...listeners.value,
      ...props.inputAttrs,
    },
  };
});
const emit = defineEmits<InputEmits>();
const {
  attrs, listeners,
} = useAttributes<HTMLAttributes>();
const { numbersOnly } = useKeyValidation();
const keyValidation = (event: KeyboardEvent) => {
  switch (props.type) {
    case 'number':
    case 'tel':
      numbersOnly(event);
      break;
    default:
  }
};
const inputHandler = (event: Event) => {
  const el = event.target as HTMLInputElement;
  emit('update:modelValue', el.value);
};
const input = ref(null);
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
      inset: 0;
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
    @include mixins.use-logical($element, border-width, 0);

    width: 100%;
    border-radius: inherit;
    background: transparent;
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
