<template>
  <UiNumberStepper
    v-bind="numberStepperAttrs"
    :model-value="modelValue"
    :style="{ '--_range-runnable-track-width': trackWidth }"
    :min="min"
    :max="max"
    :step="step"
    class="ui-range"
    @update:model-value="changeHandler"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="data"
    >
      <slot
        :name="name"
        v-bind="data"
      />
    </template>
    <template
      #default="{
        change,
        value
      }"
    >
      <div class="ui-range__input">
        <!-- @slot Use this slot to replace value template. -->
        <slot
          name="value"
          v-bind="{
            value,
            headingValueAttrs: defaultProps.headingValueAttrs
          }"
        >
          <UiHeading
            v-bind="defaultProps.headingValueAttrs"
            class="ui-range__value"
          >
            {{ value }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace range template. -->
        <slot
          name="range"
          v-bind="{
            inputAttrs: defaultProps.inputAttrs,
            min,
            max,
            change,
            value
          }"
        >
          <input
            v-keyboard-focus
            v-bind="defaultProps.inputAttrs"
            type="range"
            :min="min"
            :max="max"
            :value="value"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuenow="value"
            class="ui-range__track"
            @input="change(($event.target as HTMLInputElement).valueAsNumber)"
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
import { computed } from 'vue';
import type { InputHTMLAttributes } from 'vue';
import useAttributes from '../../../composable/useAttributes';
import { keyboardFocus as vKeyboardFocus } from '../../../utilities/directives';
import UiHeading from '../UiHeading/UiHeading.vue';
import type { HeadingAttrsProps } from '../UiHeading/UiHeading.vue';
import UiNumberStepper from '../../molecules/UiNumberStepper/UiNumberStepper.vue';
import type { NumberStepperAttrsProps } from '../../molecules/UiNumberStepper/UiNumberStepper.vue';
import type { DefineAttrsProps } from '../../../types';

export type RangeModelValue = number;
export interface RangeProps {
  /**
   * Use this props or v-model to set value.
   */
  modelValue?: number;
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
   * Use this props to pass attrs for value UiHeading
   */
  headingValueAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for input element.
   */
  inputAttrs?: DefineAttrsProps<null, InputHTMLAttributes>;
}
export type RangeAttrs = DefineAttrsProps<RangeProps, NumberStepperAttrsProps>;
export interface RangeEmits {
  (e:'update:modelValue', value: RangeModelValue): void;
}

const props = withDefaults(defineProps<RangeProps>(), {
  modelValue: 0,
  min: 0,
  max: 1,
  step: 1,
  headingValueAttrs: () => ({
    level: 1,
    tag: 'span',
  }),
  inputAttrs: () => ({}),
});
const defaultProps = computed(() => {
  const tag: HeadingAttrsProps['tag'] = 'span';
  const level: HeadingAttrsProps['level'] = 1;
  return {
    headingValueAttrs: {
      tag,
      level,
      ...props.headingValueAttrs,
    },
    inputAttrs: {
      ...listeners.value,
      ...props.inputAttrs,
    },
  };
});
const emit = defineEmits<RangeEmits>();
const {
  attrs, listeners,
} = useAttributes<NumberStepperAttrsProps>();
const trackWidth = computed(() => {
  const scope = props.max - props.min;
  const position = props.modelValue - props.min;
  return `${(position / scope) * 100}%`;
});
const changeHandler = (value: RangeModelValue) => {
  if (attrs.value.disabled) return;
  emit('update:modelValue', value);
};
const numberStepperAttrs = computed<NumberStepperAttrsProps>(() => ({ ...attrs.value }));
</script>

<style lang="scss">
@use "../../../styles/mixins";
@use "../../../styles/functions";

.ui-range {
  $element: range;

  --_range-thumb-size: #{functions.var($element + "-thumb", size, 3rem)};
  --_range-thumb-half-of-size: calc(var(--_range-thumb-size) / 2);

  @include mixins.use-logical($element, padding, calc(var(--_range-thumb-size) + 0.5rem) 0 0 0);

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  @include mixins.from-tablet {
    flex-flow: row nowrap;
  }

  &__input {
    @include mixins.use-logical($element + "input", margin, 0 0 var(--space-24) 0);

    position: relative;
    height: var(--_range-thumb-size);
    flex: 0 0 100%;
    order: -1;
    touch-action: none;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-input", margin, 0);

      flex: 0 1 100%;
      order: 0;
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

      @include mixins.use-logical($element + "-track", border-radius, var(--_range-track-height));

      position: absolute;
      top: 50%;
      left: 0;
      height: var(--_range-track-height);
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

    @include mixins.use-logical($element + "-track", margin, 0);

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
      @include mixins.use-logical($element + "-thumb", border, 0);
      @include mixins.use-logical($element + "-thumb", border-radius,  var(--border-radius-circle));

      width: functions.var($element + "-thumb", size, 3rem);
      height: functions.var($element + "-thumb", size, 3rem);
      background-color: var(--_range-thumb-background);
      background-image: functions.var($element + "-thumb", background-image, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M34 12l-2.828 2.828L40.344 24l-9.172 9.172L34 36l12-12zm0 0M14 12l2.828 2.828L7.656 24l9.172 9.172L14 36 2 24zm0 0' fill-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E%0A"));
      background-position: center;
      background-repeat: no-repeat;
      background-size: functions.var($element + "-thumb-icon", size, 1.5rem);
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
