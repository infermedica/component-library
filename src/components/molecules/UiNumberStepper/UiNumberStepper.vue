<template>
  <div
    class="ui-number-stepper"
  >
    <!--
      @slot Use this slot to place content inside number stepper.
      @binding {number} value
      @binding {number} min
      @binding {number} max
      @binding {number} step
      @binding {function} change
     -->
    <slot
      v-bind="{
        value: modelValue,
        min,
        max,
        step,
        change,
      }"
    />
    <!--
      @slot Use this slot to replace decrement template.
      @binding {boolean} hasControls
      @binding {boolean} isMin
      @binding {ButtonAttrsProps} buttonDecrementAttrs
      @binding {IconAttrsProps} iconDecrementAttrs
      @binding {function} decrement
     -->
    <slot
      name="decrement"
      v-bind="{
        hasControls,
        isMin,
        buttonDecrementAttrs: defaultProps.buttonDecrementAttrs,
        iconDecrementAttrs: defaultProps.iconDecrementAttrs,
        decrement,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="defaultProps.buttonDecrementAttrs"
        :class="[
          'ui-button--outlined ui-button--circled ui-number-stepper__decrement', { 'ui-button--is-disabled': isMin }
        ]"
        @click="decrement"
      >
        <UiIcon
          v-bind="defaultProps.iconDecrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </slot>
    <!--
      @slot Use this slot to replace increment template.
      @binding {boolean} hasControls
      @binding {boolean} isMac
      @binding {ButtonAttrsProps} buttonIncrementAttrs
      @binding {IconAttrsProps} iconIncrementAttrs
      @binding {function} increment
     -->
    <slot
      name="increment"
      v-bind="{
        hasControls,
        isMax,
        buttonIncrementAttrs: defaultProps.buttonIncrementAttrs,
        iconIncrementAttrs: defaultProps.iconIncrementAttrs,
        increment,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="defaultProps.buttonIncrementAttrs"
        :class="[
          'ui-button--outlined ui-button--circled ui-number-stepper__increment',
          { 'ui-button--is-disabled': isMax }
        ]"
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
import type { DefineAttrsProps } from '../../../types';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';

export type NumberStepperModelValue = number;
export interface NumberStepperProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: NumberStepperModelValue;
  /**
   * Use this props to set min value.
   */
  min?: number;
  /**
   * Use this props to set max value.
   */
  max?: number;
  /**
   * Use this props to set step value.
   */
  step?: number;
  /**
   * Use this props to hide controls.
   */
  hasControls?: boolean;
  /**
   * Use this props to pass attrs for decrement UiButton
   */
  buttonDecrementAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for decrement UiIcon
   */
  iconDecrementAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for increment UiButton
   */
  buttonIncrementAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for increment UiIcon
   */
  iconIncrementAttrs?: IconAttrsProps;
}
export type NumberStepperAttrsProps = DefineAttrsProps<NumberStepperProps>;
export interface NumberStepperEmits {
  (e: 'update:modelValue', value: NumberStepperModelValue): void;
  (e: 'error:value', value: {isMin: boolean, isMax: boolean}): void;
}

const props = withDefaults(defineProps<NumberStepperProps>(), {
  modelValue: 0,
  min: 0,
  max: 1,
  step: 1,
  hasControls: true,
  buttonDecrementAttrs: () => ({
    'aria-hidden': true,
    tabindex: -1,
  }),
  iconDecrementAttrs: () => ({ icon: 'minus' }),
  buttonIncrementAttrs: () => ({
    'aria-hidden': true,
    tabindex: -1,
  }),
  iconIncrementAttrs: () => ({ icon: 'plus' }),
});
const defaultProps = computed(() => {
  const decrementIcon: IconAttrsProps['icon'] = 'minus';
  const incrementIcon: IconAttrsProps['icon'] = 'plus';
  return {
    buttonDecrementAttrs: {
      'aria-hidden': true,
      tabindex: -1,
      ...props.buttonDecrementAttrs,
    },
    iconDecrementAttrs: {
      icon: decrementIcon,
      ...props.iconDecrementAttrs,
    },
    buttonIncrementAttrs: {
      'aria-hidden': true,
      tabindex: -1,
      ...props.buttonIncrementAttrs,
    },
    iconIncrementAttrs: {
      icon: incrementIcon,
      ...props.iconIncrementAttrs,
    },
  };
});
const emit = defineEmits<NumberStepperEmits>();
const validate = (value: number) => (value >= props.min && value <= props.max);
const isMin = computed(() => props.modelValue === props.min);
const isMax = computed(() => props.modelValue === props.max);
const change = (value: number, modifier = 0) => {
  const newValue = value + modifier;
  if (validate(newValue)) {
    emit('update:modelValue', newValue);
    return;
  }
  emit('error:value', {
    isMin: isMin.value,
    isMax: isMax.value,
  });
};
const decrement = () => {
  change(props.modelValue, props.step * -1);
};
const increment = () => {
  change(props.modelValue, props.step);
};
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
    @include mixins.use-logical($element + "-decrement", margin, 0 var(--space-12) 0 0);

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-decrement", margin, 0 var(--space-4) 0 0);

      order: -1;
    }
  }

  &__increment {
    @include mixins.use-logical($element + "-increment", margin, 0 0 0 var(--space-12));

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-increment", margin, 0 0 0 var(--space-4));
    }
  }
}
</style>
