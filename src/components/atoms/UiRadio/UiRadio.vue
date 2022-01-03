<template>
  <label
    class="ui-radio"
    :for="radioId"
    v-bind="getRootAttrs($attrs)"
  >
    <input
      :id="radioId"
      v-keyboard-focus
      type="radio"
      class="visual-hidden"
      :checked="isChecked"
      v-bind="getInputAttrs($attrs)"
      @change="changeHandler($event.target.checked)"
    >
    <!-- @slot Use this slot to replace radiobutton template. -->
    <slot
      name="radiobutton"
    >
      <div
        class="ui-radio__radiobutton"
      >
        <div
          class="ui-radio__mark"
        />
      </div>
    </slot>
    <!-- @slot Use this slot to replace label template. -->
    <slot name="label">
      <div
        v-if="hasLabel"
        class="ui-radio__label"
      >
        <!-- @slot Use this slot to place content inside label. -->
        <slot />
      </div>
    </slot>
  </label>
</template>

<script>
import equal from 'fast-deep-equal';
import { uid } from 'uid/single';
import { computed } from 'vue';
import useInput from '../../../composable/useInput';
import { keyboardFocus } from '../../../utilities/directives';

export default {
  name: 'UiRadio',
  directives: {
    keyboardFocus,
  },
  inheritAttrs: false,
  props: {
    /**
     * Use this props to set radio id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set value of radio.
     */
    value: {
      type: [Number, String, Object],
      default: '',
    },
    /**
     * Use this props or v-model to set checked.
     */
    modelValue: {
      type: [Number, String, Object],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const hasLabel = computed(() => (slots.default));
    const radioId = computed(() => (
      props.id || `radio-${uid()}`
    ));
    const isChecked = computed(() => (equal(JSON.parse(JSON.stringify(props.value)), JSON.parse(JSON.stringify(props.modelValue)))));
    const { getRootAttrs, getInputAttrs } = useInput();

    function changeHandler(checked) {
      if (checked) {
        emit('update:modelValue', JSON.parse(JSON.stringify(props.value)));
      }
    }

    return {
      hasLabel,
      radioId,
      isChecked,
      getRootAttrs,
      getInputAttrs,
      changeHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';
// use .ui-radio--is-disabled class for disabling checkbox visually
// use .ui-radio--has-error class indicating validation error visually

.ui-radio {
  $this: &;

  display: inline-flex;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      --radio-border: solid var(--color-border-strong-hover);
    }
  }

  &:active {
    --radio-border: solid var(--color-border-strong-active);
  }

  &__radiobutton {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--radio-size, 1.25rem);
    height: var(--radio-size, 1.25rem);
    margin: var(--radio-margin, 0.125rem);
    overflow: hidden;
    background: var(--radio-background, var(--color-background-white));
    border: var(--radio-border, solid var(--color-border-strong));
    border-width: var(--radio-border-width, 2px);
    border-radius: var(--border-radius-circle);
  }

  &__mark {
    flex: none;
    width: var(--radio-mark-size, 0.625rem);
    height: var(--radio-mark-size, 0.625rem);
    background: var(--radio-mark-background, transparent);
    border-radius: var(--border-radius-circle);
  }

  input {
    &:checked {
      & + #{$this}__radiobutton {
        --radio-border: solid var(--color-selectioncontrols-selection);
        --radio-mark-background: var(--color-selectioncontrols-selection);
      }

      @media (hover: hover) {
        &:hover + #{$this}__radiobutton {
          --radio-border: solid var(--color-selectioncontrols-selection-hover);
          --radio-mark-background: var(--color-selectioncontrols-selection-hover);
        }
      }

      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-selectioncontrols-selection-active);
        --radio-mark-background: var(--color-selectioncontrols-selection-active);
      }
    }

    &:focus + #{$this}__radiobutton {
      box-shadow: var(--focus-outer);
    }
  }

  &__label {
    @include font(body-1);

    flex: var(--radio-label-flex, 1);
    margin: var(--radio-label-margin, 0 0 0 var(--space-12));
    color: var(--radio-label-color, var(--color-text-body));

    [dir=rtl] & {
      margin: var(--radio-label-margin, 0 var(--space-12) 0 0);
    }
  }

  &--is-disabled {
    --radio-border: solid var(--color-border-subtle);

    cursor: not-allowed;

    @media (hover: hover) {
      &:hover {
        --radio-border: solid var(--color-border-subtle);
      }
    }

    &:active {
      --radio-border: solid var(--color-border-subtle);
    }

    input:checked {
      & + #{$this}__radiobutton,
      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-border-subtle);
        --radio-mark-background: var(--color-border-subtle);
      }

      @media (hover: hover) {
        &:hover + #{$this}__radiobutton {
          --radio-border: solid var(--color-border-subtle);
          --radio-mark-background: var(--color-border-subtle);
        }
      }
    }
  }

  &--has-error {
    --radio-border: solid var(--color-border-error-strong);

    @media (hover: hover) {
      &:hover {
        --radio-border: solid var(--color-border-error-strong);
      }
    }

    &:active {
      --radio-border: solid var(--color-border-error-strong);
    }

    input:checked {
      & + #{$this}__radiobutton,
      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-border-error-strong);
        --radio-mark-background: var(--color-border-error-strong);
      }

      @media (hover: hover) {
        &:hover + #{$this}__radiobutton {
          --radio-border: solid var(--color-border-error-strong);
          --radio-mark-background: var(--color-border-error-strong);
        }
      }
    }
  }
}
</style>
