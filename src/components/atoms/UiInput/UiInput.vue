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
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </slot>
  </div>
</template>

<script>
import UiText from '../UiText/UiText.vue';
import useInput from '../../../composable/useInput';
import useKeyValidation from '../../../composable/useKeyValidation';
import { keyboardFocus } from '../../../utilities/directives';

export default {
  name: 'UiInput',
  components: {
    UiText,
  },
  directives: {
    keyboardFocus,
  },
  inheritAttrs: false,
  props: {
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
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
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

    return {
      getInputAttrs,
      getRootAttrs,
      keyValidation,
      inputHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-input {
  $this: &;

  display: inline-flex;
  align-items: center;
  overflow: hidden;
  color: var(--input-color, var(--color-text-body));
  background-color: var(--input-background-color, var(--color-background-white));
  border: var(--input-border, solid var(--input-border-color, var(--color-border-strong)));
  border-width: var(--input-border-width, 1px);
  border-radius: var(--input-border-radius, var(--border-radius-form));

  &:focus-within {
    --input-border-color: var(--input-focus-border-color, var(--color-border-strong));

    outline: none;
    box-shadow: var(--focus-outer);
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
    @include font(body-1);

    width: 100%;
    padding: var(--input-padding, var(--space-12) var(--space-16));
    color: var(--input-color);
    border: 0;
    outline: none;
    caret-color: var(--input-caret-color, var(--color-blue-500));

    &::placeholder {
      color: var(--input-placeholder-color, var(--color-text-dimmed));
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &:disabled {
      cursor: not-allowed;
      background: var(--input-background-color, var(--color-background-white));
    }

    &[type="number"] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }

      -moz-appearance: none;
    }
  }

  &__aside {
    @include font(body-1);

    flex: none;
    margin: var(--input-aside-margin, 0 var(--space-16) 0 0);
    color: var(--input-suffix-color, var(--input-color), var(--color-text-body));

    [dir=rtl] & {
      margin: var(--input-aside-margin, 0 0 0 var(--space-16));
    }
  }

  &--has-icon {
    --icon-size: var(--input-icon-size, 1.5rem);
    #{$this}__aside {
      --input-aside-margin: var(--input-aside-margin, 0 var(--space-12) 0 0);

      [dir=rtl] & {
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
