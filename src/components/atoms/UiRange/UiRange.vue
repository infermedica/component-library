<template>
  <UiNumberStepper
    v-bind="{
      ...getRootAttrs($attrs),
      ...proxyNumberStepperAttrs
    }"
    :model-value="modelValue"
    :style="{
      '--_range-runnable-track-width': trackWidth
    }"
    :min="min"
    :max="max"
    :step="step"
    class="ui-range"
    @update:model-value="changeHandler"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
    <template
      #default="{
        change, value
      }"
    >
      <div class="ui-range__input">
        <!-- @slot Use this slot to replace value template. -->
        <slot
          name="value"
          v-bind="{
            value
          }"
        >
          <UiHeading
            :level="1"
            tag="span"
            class="ui-range__value"
          >
            {{ value }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace range template. --->
        <slot
          name="range"
          v-bind="{
            attrs: getInputAttrs($attrs),
            min,
            max,
            change,
            value
          }"
        >
          <input
            v-keyboard-focus
            v-bind="getInputAttrs($attrs)"
            type="range"
            :min="min"
            :max="max"
            :value="value"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuenow="value"
            class="ui-range__track"
            @input="change($event.target.valueAsNumber)"
          >
        </slot>
      </div>
    </template>
  </UiNumberStepper>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import UiHeading from '../UiHeading/UiHeading.vue';
import UiNumberStepper from '../../molecules/UiNumberStepper/UiNumberStepper.vue';
import useInput from '../../../composable/useInput';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';
import type { PropsAttrs } from '../../../types/attrs';

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
   * USe this props to pass attrs for UiNumberStepper
   */
  numberStepperAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const attrs = useAttrs();
const emit = defineEmits<{(e:'update:modelValue', value: number): void}>();
const {
  getRootAttrs, getInputAttrs,
} = useInput();
const trackWidth = computed(() => {
  const scope = props.max - props.min;
  const position = props.modelValue - props.min;
  return `${(position / scope) * 100}%`;
});
function changeHandler(value: number) {
  if (attrs.disabled) return;
  emit('update:modelValue', value);
}
// TODO: remove in 0.6.0 / BEGIN
const buttonDecrementAttrs = computed(() => attrs.buttonDecrementAttrs || attrs['button-decrement-attrs']);
if (buttonDecrementAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiRange]: buttonDecrementAttrs will be removed in 0.6.0. Please use numberStepperAttrs instead.');
  }
}
const buttonIncrementAttrs = computed(() => attrs.buttonIncrementAttrs || attrs['button-increment-attrs']);
if (buttonIncrementAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiRange]: buttonIncrementAttrs will be removed in 0.6.0. Please use numberStepperAttrs instead.');
  }
}
const proxyNumberStepperAttrs = computed(() => ({
  buttonDecrementAttrs: buttonDecrementAttrs.value,
  buttonIncrementAttrs: buttonIncrementAttrs.value,
  ...props.numberStepperAttrs,
}));
// END
</script>

<style lang="scss">
@use "../../../styles/mixins";
@use "../../../styles/functions";

.ui-range {
  $element: range;

  --_range-thumb-size: #{functions.var($element + "-thumb", size, 3rem)};
  --_range-thumb-half-of-size: calc(var(--_range-thumb-size) / 2);

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: calc(var(--_range-thumb-size) + 0.5rem) 0 0 0;

  @include mixins.from-tablet {
    flex-flow: row nowrap;
  }

  &__input {
    position: relative;
    height: var(--_range-thumb-size);
    flex: 0 0 100%;
    order: -1;
    margin: functions.var($element + "-input", margin, 0 0 var(--space-24) 0);
    touch-action: none;

    @include mixins.from-tablet {
      flex: 0 1 100%;
      order: 0;
      margin: functions.var($element + "-tablet-input", margin, 0);
    }

    &::before {
      width: calc((100% - (var(--_range-thumb-half-of-size)) * 2));
      background: functions.var($element + "-track", background, var(--color-progress-track));
    }

    &::after {
      width: calc(var(--_range-runnable-track-width) - var(--_range-thumb-half-of-size));
      background: functions.var($element + "-runnable-track", background, var(--color-range-progress-indicator));
    }

    &::before,
    &::after {
      --_range-track-height: #{functions.var($element + "-track", height, 4px)};

      position: absolute;
      top: 50%;
      left: 0;
      height: var(--_range-track-height);
      border-radius: var(--_range-track-height);
      content: "";
      transform: translate(var(--_range-thumb-half-of-size), -50%);

      [dir="rtl"] & {
        right: 0;
        left: auto;
        transform: translate(calc(var(--_range-thumb-half-of-size) * -1), -50%);
      }
    }
  }

  &__value {
    --_range-value-margin-bottom: #{functions.var($element + "-value", margin-bottom, var(--space-8))};

    position: absolute;
    left: var(--_range-runnable-track-width);
    display: flex;
    width: functions.var($element + "-thumb", size, 3rem);
    align-items: center;
    justify-content: center;
    transform:
      translate3d(
        calc(var(--_range-runnable-track-width) * -1),
        calc((var(--_range-thumb-size) + var(--_range-value-margin-bottom)) * -1),
        0
      );
    transform-origin: center;

    [dir="rtl"] & {
      right: var(--_range-runnable-track-width);
      left: auto;
      transform:
        translate3d(
          calc(var(--_range-runnable-track-width)),
          calc((var(--_range-thumb-size) + var(--_range-value-margin-bottom)) * -1),
          0
        );
    }
  }

  &__track {
    --_range-thumb-background: #{ functions.var($element + "-thumb", background-color, var(--color-range-thumb))};

    position: absolute;
    z-index: 1;
    top: 50%;
    width: 100%;
    margin: 0;
    appearance: none;
    background: transparent;
    outline: none;
    transform: translateY(-50%);

    @include mixins.with-hover {
      cursor: pointer;
    }

    @mixin thumb {
      width: functions.var($element + "-thumb", size, 3rem);
      height: functions.var($element + "-thumb", size, 3rem);
      border: 0;
      background-color: var(--_range-thumb-background);
      background-image: functions.var($element + "-thumb", background-image, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M34 12l-2.828 2.828L40.344 24l-9.172 9.172L34 36l12-12zm0 0M14 12l2.828 2.828L7.656 24l9.172 9.172L14 36 2 24zm0 0' fill-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E%0A"));
      background-position: center;
      background-repeat: no-repeat;
      background-size: functions.var($element + "-thumb-icon", size, 1.5rem);
      border-radius: functions.var($element + "-thumb", border-radius, var(--border-radius-circle));
      box-shadow: functions.var($element + "-thumb", box-shadow, var(--box-shadow-high));
      transition:
        functions.var(
          $element + "-thumb",
          transition,
          background-color 150ms ease-in-out
        );
    }

    &::-webkit-slider-thumb {
      @include thumb;

      appearance: none;
    }

    &::-moz-range-thumb {
      @include thumb;
    }

    @include mixins.hover {
      --_range-thumb-background:
        #{ functions.var(
          $element + "-thumb-hover",
          background-color,
          var(--color-range-thumb-hover)
        )};
    }

    &:active {
      --_range-thumb-background:
        #{ functions.var(
          $element + "-thumb-active",
          background-color,
          var(--color-range-thumb-active)
        )};
    }

    @include mixins.focus {
      &::-webkit-slider-thumb {
        box-shadow: var(--focus-outer);
      }

      &::-moz-range-thumb {
        box-shadow: var(--focus-outer);
      }
    }
  }
}
</style>
