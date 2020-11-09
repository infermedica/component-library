<template>
  <label
    class="ui-radio"
    :for="radioId"
    v-bind="rootAttrs"
  >
    <input
      :id="radioId"
      type="radio"
      class="visual-hidden"
      :checked="isChecked"
      v-bind="inputAttrs"
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
      <div class="ui-radio__label">
        <!-- @slot Use this slot to place content inside label. -->
        <slot />
      </div>
    </slot>
  </label>
</template>

<script>
import { uid } from 'uid/single';
import { ref, computed } from 'vue';

export default {
  name: 'UiRadio',
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
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props or v-model to set checked.
     */
    modelValue: {
      type: [String, Object],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const focused = ref(false);
    const radioId = computed(() => (
      props.id || `radio-${uid()}`
    ));
    const isChecked = computed(() => (
      JSON.stringify(props.value) === JSON.stringify(props.modelValue)
    ));
    const inputAttrs = computed(() => (
      Object.keys(attrs)
        .filter((key) => !key.match(/class|styles|^on.*/gi))
        .reduce((obj, key) => (
          { ...obj, [key]: attrs[key] }
        ), {})
    ));
    const rootAttrs = computed(() => (
      Object.keys(attrs)
        .filter((key) => key.match(/class|styles|^on.*/gi))
        .reduce((obj, key) => (
          { ...obj, [key]: attrs[key] }
        ), {})
    ));
    function changeHandler(checked) {
      if (checked) {
        emit('update:modelValue', JSON.parse(JSON.stringify(props.value)));
      }
    }

    return {
      focused,
      radioId,
      isChecked,
      rootAttrs,
      inputAttrs,
      changeHandler,
    };
  },
};
</script>

<style lang="scss">
// use .ui-radio--is-disabled class for disabling checkbox visually
// use .ui-radio--has-error class indicating validation error visually

.ui-radio {
  $this: &;

  display: inline-flex;
  cursor: pointer;

  &:hover {
    --radio-border: solid var(--color-border-hover);
  }

  &:active {
    --radio-border: solid var(--color-border-active);
  }

  &__radiobutton {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--radio-size, 1.25rem);
    height: var(--radio-size, 1.25rem);
    margin: var(--radio-margin, 0 var(--space-12) 0 0);
    overflow: hidden;
    background: var(--radio-background, var(--color-ui-bg-lightest));
    border: var(--radio-border, solid var(--color-border-accessible));
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
        --radio-border: solid var(--color-radio-checkbox-selected-enabled);
        --radio-mark-background: var(--color-radio-checkbox-selected-enabled);
      }

      &:hover + #{$this}__radiobutton {
        --radio-border: solid var(--color-radio-checkbox-selected-hover);
        --radio-mark-background: var(--color-radio-checkbox-selected-hover);
      }

      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-radio-checkbox-selected-active);
        --radio-mark-background: var(--color-radio-checkbox-selected-active);
      }
    }

    &:focus + #{$this}__radiobutton {
      box-shadow: var(--box-shadow-outline);
    }
  }

  &__label {
    flex: unset;
  }

  &--is-disabled {
    --radio-border: solid var(--color-border-subtle);

    cursor: not-allowed;

    &:hover {
      --radio-border: solid var(--color-border-subtle);
    }

    &:active {
      --radio-border: solid var(--color-border-subtle);
    }

    input:checked {
      & + #{$this}__radiobutton,
      &:hover + #{$this}__radiobutton,
      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-border-subtle);
        --radio-mark-background: var(--color-border-subtle);
      }
    }
  }

  &--has-error {
    --radio-border: solid var(--color-border-alert-error-accessible);

    &:hover {
      --radio-border: solid var(--color-border-alert-error-accessible);
    }

    &:active {
      --radio-border: solid var(--color-border-alert-error-accessible);
    }

    input:checked {
      & + #{$this}__radiobutton,
      &:hover + #{$this}__radiobutton,
      &:active + #{$this}__radiobutton {
        --radio-border: solid var(--color-border-alert-error-accessible);
        --radio-mark-background: var(--color-border-alert-error-accessible);
      }
    }
  }
}
</style>
