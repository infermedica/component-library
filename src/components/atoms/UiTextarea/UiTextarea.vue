<template>
  <textarea
    v-keyboard-focus
    :value="modelValue"
    class="ui-textarea"
    :style="{resize: resizeValue}"
    @input="inputHandler($event.target.value)"
  />
</template>

<script>
import { computed } from 'vue';
import { keyboardFocus } from '../../../utilities/directives';

export default {
  name: 'UiTextarea',
  directives: {
    keyboardFocus,
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
     * Use this props to enable resizing on textarea.
     * true - both direction resizing, false - disable resizing,
     * 'horizontal' - horizontal resizing only, 'vertical' - vertical resizing only
     */
    resize: {
      type: [Boolean, String],
      optional: true,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function inputHandler(value) {
      emit('update:modelValue', value);
    }

    const resizeValue = computed(() => {
      if (props.resize) {
        return typeof variable === 'boolean' ? 'both' : props.resize;
      }
      return 'none';
    });

    return {
      resizeValue,
      inputHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-textarea {
  @include font(body-1);

  display: inline-flex;
  align-items: center;
  padding: var(--textarea-padding, var(--space-12) var(--space-16));
  color: var(--textarea-color, var(--color-text-body));
  background-color: var(--textarea-background-color, var(--color-background-white));
  border: var(--textarea-border, solid var(--textarea-border-color, var(--color-border-accessible)));
  border-width: var(--textarea-border-width, 1px);
  border-radius: var(--textarea-border-radius, var(--border-radius-form));

  &::placeholder {
    @include font(body-1);

    color: var(--textarea-placeholder-color, var(--color-text-dimmed));
  }

  &:focus {
    outline: none;
    box-shadow: var(--box-shadow-outline);
  }

  @media (hover: hover) {
    &:hover {
      --textarea-border-color: var(--textarea-hover-border-color, var(--color-border-hover));

      &:focus-within {
        --textarea-hover-border-color: var(--textarea-focus-border-color);
      }
    }
  }

  &--has-error {
    --textarea-placeholder-color: var(--textarea-error-placeholder-color, var(--color-text-body));
    --textarea-border-color: var(--textarea-error-border-color, var(--color-border-alert-error-accessible));
    --textarea-hover-border-color: var(--textarea-error-hover-border-color, var(--color-border-alert-error-accessible));
    --textarea-focus-border-color: var(--color-border-alert-error-accessible);
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
