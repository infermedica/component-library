<template>
  <div
    class="ui-number-stepper"
  >
    <!-- @slot Use this slot to place content inside number stepper. -->
    <slot
      v-bind="{
        change,
        value: modelValue,
        min,
        max,
        step
      }"
    />
    <!-- @slot Use this slot to replace decrement template. -->
    <slot
      name="decrement"
      v-bind="{
        hasControls,
        buttonDecrementAttrs: defaultProps.buttonDecrementAttrs,
        isMin,
        decrement,
        iconDecrementAttrs: defaultProps.iconDecrementAttrs,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="defaultProps.buttonDecrementAttrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__decrement"
        :class="{ 'ui-button--is-disabled': isMin }"
        @click="decrement"
      >
        <UiIcon
          v-bind="defaultProps.iconDecrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </slot>
    <!-- @slot Use this slot to replace increment template. -->
    <slot
      name="increment"
      v-bind="{
        hasControls,
        buttonIncrementAttrs: defaultProps.buttonIncrementAttrs,
        isMax,
        increment,
        iconIncrementAttrs: defaultProps.iconIncrementAttrs,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="defaultProps.buttonIncrementAttrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__increment"
        :class="{ 'ui-button--is-disabled': isMax }"
        @click="increment"
      >
        <UiIcon
          v-bind="defaultProps.iconIncrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { Icon } from '../../../types/icon';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set min value.
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set max value.
   */
  max: {
    type: Number,
    default: 1,
  },
  /**
   * Use this props to set step value.
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * Use this props to hide controls.
   */
  hasControls: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to pass attrs for decrement UiButton
   */
  buttonDecrementAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
      'aria-hidden': true,
      tabindex: -1,
    }),
  },
  /**
   * Use this props to pass attrs for decrement UiIcon
   */
  iconDecrementAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'minus' }),
  },
  /**
   * Use this props to pass attrs for increment UiButton
   */
  buttonIncrementAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
      'aria-hidden': true,
      tabindex: -1,
    }),
  },
  /**
   * Use this props to pass attrs for increment UiIcon
   */
  iconIncrementAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'plus' }),
  },
});
const defaultProps = computed(() => ({
  buttonDecrementAttrs: {
    'aria-hidden': true,
    tabindex: -1,
    ...props.buttonDecrementAttrs,
  },
  iconDecrementAttrs: {
    icon: 'minus' as Icon,
    ...props.iconDecrementAttrs,
  },
  buttonIncrementAttrs: {
    'aria-hidden': true,
    tabindex: -1,
    ...props.buttonIncrementAttrs,
  },
  iconIncrementAttrs: {
    icon: 'plus' as Icon,
    ...props.iconIncrementAttrs,
  },
}));
const emit = defineEmits<{(e:'update:modelValue', value: number): void,
  (e: 'error', value: {isMin: boolean, isMax: boolean}): void}>();
const validate = (value: number) => (value >= props.min && value <= props.max);
const isMin = computed(() => props.modelValue === props.min);
const isMax = computed(() => props.modelValue === props.max);
function change(value: number, modifier = 0) {
  const newValue = value + modifier;
  if (validate(newValue)) {
    emit('update:modelValue', newValue);
    return;
  }
  emit('error', {
    isMin: isMin.value,
    isMax: isMax.value,
  });
}
function decrement(): void {
  change(props.modelValue, props.step * -1);
}
function increment(): void {
  change(props.modelValue, props.step);
}
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-number-stepper {
  $element: number-stepper;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @include mixins.from-tablet {
    justify-content: flex-start;
  }

  &__decrement {
    margin: functions.var($element + "-decrement", margin, 0 var(--space-12) 0 0);

    &[dir="rtl"] {
      margin: functions.var($element + "-rtl-decrement", margin, 0 0 0 var(--space-12));
    }

    @include mixins.from-tablet {
      order: -1;
      margin: functions.var($element + "-tablet-decrement", margin, 0 var(--space-4) 0 0);

      &[dir="rtl"] {
        margin: functions.var($element + "-rtl-tablet-decrement", margin, 0 0 0 var(--space-4));
      }
    }
  }

  &__increment {
    margin: functions.var($element + "-increment", margin, 0 0 0 var(--space-12));

    &[dir="rtl"] {
      margin: functions.var($element + "-rtl-increment", margin, 0 var(--space-12) 0 0);
    }

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-increment", margin, 0 0 0 var(--space-4));

      &[dir="rtl"] {
        margin: functions.var($element + "-rtl-tablet-increment", margin, 0 var(--space-4) 0 0);
      }
    }
  }
}
</style>
