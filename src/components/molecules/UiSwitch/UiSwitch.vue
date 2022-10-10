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
          controlAttrs
        }"
      >
        <UiSwitchControl
          v-bind="controlAttrs"
          :class="[
            'ui-switch__control', {
              'ui-switch-control--is-checked': checked,
              'ui-switch__control--is-checked': checked,
            }
          ]"
        />
      </slot>
    </template>
  </UiCheckbox>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiSwitchControl from './_internal/UiSwitchControl.vue';
import type { CheckboxModelValue } from '../../atoms/UiCheckbox/UiCheckbox.vue';

defineProps({
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: [
      Boolean,
      Array,
    ] as PropType<CheckboxModelValue>,
    default: false,
  },
  /**
   *  Use this props to set pass attrs for UiSwitchControl.
   */
  controlAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: CheckboxModelValue): void}>();
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
