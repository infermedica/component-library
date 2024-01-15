<template>
  <UiCheckbox
    class="ui-switch"
    :model-value="modelValue"
    @update:model-value="updateHandler"
  >
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]="data"
    >
      <slot
        :name="slot"
        v-bind="data"
      />
    </template>
    <template
      #checkbox="{ checked }"
    >
      <!-- @slot Use this slot to replace switch control template. -->
      <slot
        name="switchcontrol"
        v-bind="{
          checked,
          controlAttrs,
        }"
      >
        <UiSwitchControl
          v-bind="controlAttrs"
          :class="[
            'ui-switch__control', {
              'ui-switch-control--is-checked': checked,
              'ui-switch__control--is-checked': checked,
            },
          ]"
        />
      </slot>
    </template>
  </UiCheckbox>
</template>

<script setup lang="ts">
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import type {
  CheckboxModelValue,
  CheckboxAttrsProps,
} from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiSwitchControl from './_internal/UiSwitchControl.vue';
import type { SwitchControlAttrsProps } from './_internal/UiSwitchControl.vue';
import type { DefineAttrsProps } from '../../../types';

export interface SwitchProps {
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue?: CheckboxModelValue;
  /**
   *  Use this props to set pass attrs for UiSwitchControl.
   */
  controlAttrs?: SwitchControlAttrsProps;
}
export type SwitchAttrsProps = DefineAttrsProps<SwitchProps, CheckboxAttrsProps>
export interface SwitchEmits {
  (e: 'update:modelValue', value: CheckboxModelValue): void
}

withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  controlAttrs: () => ({}),
});
const emit = defineEmits<SwitchEmits>();
const updateHandler = (value: CheckboxModelValue): void => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-switch {
  $this: &;
  $element: switch;

  @include mixins.hover {
    #{$this}__control {
      --switch-control-color: #{functions.var($element + "-hover", color, var(--color-switch-track-hover))};
      --switch-control-checked-color:
        #{functions.var(
          $element + "-checked-hover",
          color,
          var(--color-switch-track-checked-hover))};
    }
  }

  &:active {
    #{$this}__control {
      --switch-control-color: #{functions.var($element + "-active", color, var(--color-switch-track-active))};
      --switch-control-checked-color:
        #{functions.var(
          $element + "-checked-active",
          color,
          var(--color-switch-track-checked-active)
        )};
    }
  }

  @include mixins.with-focus {
    &:focus-within {
      #{$this}__control {
        box-shadow: var(--focus-outer);
      }
    }
  }

  &--is-disabled {
    cursor: not-allowed;

    --switch-control-color: #{functions.var($element, color, var(--color-switch-disabled))};
    --switch-control-checked-color: #{functions.var($element, color, var(--color-switch-disabled))};

    @include mixins.hover {
      #{$this}__control {
        --switch-control-color: #{functions.var($element + "-hover", color, var(--color-switch-disabled))};
        --switch-control-checked-color:
          #{functions.var(
            $element + "-checked-hover",
            color,
            var(--color-switch-disabled)
          )};
      }
    }

    &:active {
      #{$this}__control {
        --switch-control-color: #{functions.var($element + "-active", color, var(--color-switch-disabled))};
        --switch-control-checked-color:
          #{functions.var(
            $element + "-checked-active",
            color,
            var(--color-switch-disabled)
          )};
      }
    }
  }
}
</style>
