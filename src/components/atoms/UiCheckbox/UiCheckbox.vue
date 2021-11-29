<template>
  <label
    class="ui-checkbox"
    :for="checkboxId"
    v-bind="getRootAttrs($attrs)"
  >
    <input
      :id="checkboxId"
      v-keyboard-focus
      v-bind="getInputAttrs($attrs)"
      :checked="isChecked"
      type="checkbox"
      class="visual-hidden"
      @change="changeHandler($event.target.checked)"
    >
    <!-- @slot Use this slot to replace checkbutton template.-->
    <slot
      name="checkbutton"
      v-bind="{checked: isChecked}"
    >
      <div
        class="ui-checkbox__checkbutton"
      >
        <UiIcon
          icon="checkmark"
          class="ui-checkbox__mark"
        />
      </div>
    </slot>
    <!-- @slot Use this slot to replace label template. -->
    <slot name="label">
      <div
        v-if="hasLabel"
        class="ui-checkbox__label"
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
import UiIcon from '../UiIcon/UiIcon.vue';
import useInput from '../../../composable/useInput';
import { keyboardFocus } from '../../../utilities/directives';

export default {
  name: 'UiCheckbox',
  components: {
    UiIcon,
  },
  directives: {
    keyboardFocus,
  },
  inheritAttrs: false,
  props: {
    /**
     * Use this props to set checkbox id.
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set value of checkbox.
     * Required for multiple checkboxes.
     */
    value: {
      type: [String, Object],
      default: '',
    },
    /**
     *  Use this props or v-model to set checked.
     */
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const { getRootAttrs, getInputAttrs } = useInput();
    const hasLabel = computed(() => (slots.default));
    const checkboxId = computed(() => (props.id || `checkbox-${uid()}`));
    const isGroup = computed(() => (Array.isArray(props.modelValue)));
    const isChecked = computed(() => (isGroup.value
      ? props.modelValue
        .find((option) => (equal(JSON.parse(JSON.stringify(props.value)), JSON.parse(JSON.stringify(option)))))
      : props.modelValue));
    const getChecked = (checked) => {
      if (isGroup.value) {
        return checked
          ? [...props.modelValue, JSON.parse(JSON.stringify(props.value))]
          : props.modelValue
            .filter((option) => (!equal(props.value, option)));
      }
      return checked;
    };
    function changeHandler(checked) {
      emit('update:modelValue', getChecked(checked));
    }
    return {
      getRootAttrs,
      getInputAttrs,
      hasLabel,
      checkboxId,
      isChecked,
      changeHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';
// use .ui-checkbox--is-disabled class for disabling checkbox visually
// use .ui-checkbox--has-error class indicating validation error visually

.ui-checkbox {
  @include font(body-1);

  $this: &;

  display: inline-flex;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      --checkbox-border: solid var(--color-border-strong-hover);
    }
  }

  &:active {
    --checkbox-border: solid var(--color-border-strong-active);
  }

  &__checkbutton {
    --icon-size: 1rem;
    --icon-color: transparent;

    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--checkbox-size, 1.25rem);
    height: var(--checkbox-size, 1.25rem);
    margin: var(--checkbox-margin, 0.125rem);
    overflow: hidden;
    background: var(--checkbox-background, var(--color-background-white));
    border: var(--checkbox-border, solid var(--color-border-strong));
    border-width: var(--checkbox-border-width, 2px);
    border-radius: var(--checkbox-border-radius, var(--border-radius-form));
  }

  input {
    &:checked {
      & + #{$this}__checkbutton {
        --icon-color: var(--color-icon-negative);
        --checkbox-border: solid var(--color-selectioncontrols-selection);
        --checkbox-background: var(--color-selectioncontrols-selection);
      }

      @media (hover: hover) {
        &:hover + #{$this}__checkbutton {
          --checkbox-background: var(--color-selectioncontrols-selection-hover);
          --checkbox-border: solid var(--color-selectioncontrols-selection-hover);
        }
      }

      &:active + #{$this}__checkbutton {
        --checkbox-background: var(--color-selectioncontrols-selection-active);
        --checkbox-border: solid var(--color-selectioncontrols-selection-active);
      }
    }

    &:focus + #{$this}__checkbutton {
      box-shadow: var(--box-shadow-outline);
    }
  }

  &__label {
    flex: var(--checkbox-label-flex, 1);
    margin: var(--checkbox-label-margin, 0 0 0 var(--space-12));
    color: var(--checkbox-label-color, var(--color-text-body));

    [dir=rtl] & {
      margin: var(--checkbox-label-margin, 0 var(--space-12) 0 0);
    }
  }

  &--is-disabled {
    --checkbox-border: solid var(--color-border-subtle);

    cursor: not-allowed;

    @media (hover: hover) {
      &:hover {
        --checkbox-border: solid var(--color-border-subtle);
      }
    }

    &:active {
      --checkbox-border: solid var(--color-border-subtle);
    }

    input:checked {
      & + #{$this}__checkbutton,
      &:active + #{$this}__checkbutton {
        --checkbox-border: solid var(--color-border-subtle);
        --checkbox-background: var(--color-border-subtle);
      }

      @media (hover: hover) {
        &:hover + #{$this}__checkbutton {
          --checkbox-border: solid var(--color-border-subtle);
          --checkbox-background: var(--color-border-subtle);
        }
      }
    }
  }

  &--has-error {
    --checkbox-border: solid var(--color-border-error-strong);

    @media (hover: hover) {
      &:hover {
        --checkbox-border: solid var(--color-border-error-strong);
      }
    }

    &:active {
      --checkbox-border: solid var(--color-border-error-strong);
    }

    input:checked {
      & + #{$this}__checkbutton,
      &:active + #{$this}__checkbutton {
        --checkbox-border: solid var(--color-border-error-strong);
        --checkbox-background: var(--color-border-error-strong);
      }

      @media (hover: hover) {
        &:hover + #{$this}__checkbutton {
          --checkbox-border: solid var(--color-border-error-strong);
          --checkbox-background: var(--color-border-error-strong);
        }
      }
    }
  }
}
</style>
