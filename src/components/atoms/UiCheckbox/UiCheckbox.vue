<template>
  <label
    class="ui-checkbox"
    :for="checkboxId"
    v-bind="getRootAttrs($attrs)"
  >
    <input
      :id="checkboxId"
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
      <div class="ui-checkbox__label">
        <!-- @slot Use this slot to place content inside label. -->
        <slot />
      </div>
    </slot>
  </label>
</template>

<script>
import { uid } from 'uid/single';
import { computed } from 'vue';
import UiIcon from '../UiIcon/UiIcon.vue';
import useInput from '../../../composable/useInput';

export default {
  name: 'UiCheckbox',
  components: {
    UiIcon,
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
  setup(props, { emit }) {
    const checkboxId = computed(() => (
      props.id || `checkbox-${uid()}`
    ));
    const isObject = computed(() => (typeof props.modelValue === 'object'));
    const isChecked = computed(() => (
      isObject.value
        ? props.modelValue.filter(
          (option) => {
            if (typeof props.value === 'string') {
              return props.value === option;
            }
            return Object.keys(option)
              .every((key) => (option[key]) === props.value[key]);
          },
        ).length > 0
        : props.modelValue
    ));
    const { getRootAttrs, getInputAttrs } = useInput();

    function getChecked(checked) {
      let newChecked;
      if (isObject.value) {
        newChecked = checked
          ? [...props.modelValue, JSON.parse(JSON.stringify(props.value))]
          : props.modelValue.filter(
            (option) => {
              if (typeof props.value === 'string') {
                return props.value !== option;
              }
              return !Object.keys(props.value)
                .every((key) => (props.value[key] === option[key]));
            },
          );
      } else {
        newChecked = checked;
      }
      return newChecked;
    }

    function changeHandler(checked) {
      emit('update:modelValue', getChecked(checked));
    }

    return {
      checkboxId,
      isObject,
      isChecked,
      changeHandler,
      getRootAttrs,
      getInputAttrs,
    };
  },
};
</script>

<style lang="scss">
// use .ui-checkbox--is-disabled class for disabling checkbox visually
// use .ui-checkbox--has-error class indicating validation error visually

.ui-checkbox {
  $this: &;

  display: inline-flex;
  align-items: center;
  font: var(--checkbox-font, var(--font-body-1));
  cursor: pointer;

  &:hover {
    --checkbox-border: solid var(--color-border-hover);
  }

  &:active {
    --checkbox-border: solid var(--color-border-active);
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
    margin: var(--checkbox-margin, 0 var(--space-12) 0 0);
    overflow: hidden;
    background: var(--checkbox-background, var(--color-background-white));
    border: var(--checkbox-border, solid var(--color-border-accessible));
    border-width: var(--checkbox-border-width, 2px);
    border-radius: var(--checkbox-border-radius, var(--border-radius-form));
  }

  input {
    &:checked {
      & + #{$this}__checkbutton {
        --icon-color: var(--color-icon-negative);
        --checkbox-border: solid var(--color-radio-checkbox-selected-enabled);
        --checkbox-background: var(--color-radio-checkbox-selected-enabled);
      }

      &:hover + #{$this}__checkbutton {
        --checkbox-background: var(--color-radio-checkbox-selected-hover);
        --checkbox-border: solid var(--color-radio-checkbox-selected-hover);
      }

      &:active + #{$this}__checkbutton {
        --checkbox-background: var(--color-radio-checkbox-selected-active);
        --checkbox-border: solid var(--color-radio-checkbox-selected-active);
      }
    }

    &:focus + #{$this}__checkbutton {
      box-shadow: var(--box-shadow-outline);
    }
  }

  &__label {
    flex: none;
    color: var(--checkbox-label-color, var(--color-text-body));
  }

  &--is-disabled {
    --checkbox-border: solid var(--color-border-subtle);

    cursor: not-allowed;

    &:hover {
      --checkbox-border: solid var(--color-border-subtle);
    }

    &:active {
      --checkbox-border: solid var(--color-border-subtle);
    }

    input:checked {
      & + #{$this}__checkbutton,
      &:hover + #{$this}__checkbutton,
      &:active + #{$this}__checkbutton {
        --checkbox-border: solid var(--color-border-subtle);
        --checkbox-background: var(--color-border-subtle);
      }
    }
  }

  &--has-error {
    --checkbox-border: solid var(--color-border-alert-error-accessible);

    &:hover {
      --checkbox-border: solid var(--color-border-alert-error-accessible);
    }

    &:active {
      --checkbox-border: solid var(--color-border-alert-error-accessible);
    }

    input:checked {
      & + #{$this}__checkbutton,
      &:hover + #{$this}__checkbutton,
      &:active + #{$this}__checkbutton {
        --checkbox-border: solid var(--color-border-alert-error-accessible);
        --checkbox-background: var(--color-border-alert-error-accessible);
      }
    }
  }
}
</style>
