<template>
  <div
    class="ui-progress"
    :style="{ '--_progress-value': progressValue }"
  >
    <div
      v-if="progressValue"
      class="ui-progress__inner"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DefineAttrsProps } from '../../../types';

export interface ProgressProps {
  /**
   * Use this props to set the progress value.
   */
  value?: number;
  /**
   * Use this props to set the minimum value.
   */
  min?: number;
  /**
   * Use this props to set the maximum value.
   */
  max?: number;
}
export type ProgressAttrsProps = DefineAttrsProps<ProgressProps>;

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  min: 0,
  max: 100,
});
const progressValue = computed(() => {
  const progress = (props.value - props.min) / (props.max - props.min);
  if (Number.isNaN(progress)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[UiProgress error]: The result of progress calculation is NaN');
    }
    return 0;
  }
  return progress;
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-progress {
  $element: progress;

  --_progress-height: #{functions.var($element, height, 0.5rem)};
  --_progress-padding: #{functions.var($element, padding, calc(var(--_progress-height) * 0.5))};
  --_progress-border-radius: #{functions.var($element, border-radius, calc(var(--_progress-height) * 0.5))};

  @include mixins.use-logical($element, border-radius, var(--_progress-border-radius));

  overflow: hidden;
  width: 100%;
  height: var(--_progress-height);
  background: functions.var($element + "track", background, var(--color-progress-track));

  &__inner {
    @include mixins.use-logical($element, border-radius, 0);

    position: relative;
    width: calc(var(--_progress-value) * 100%);
    height: 100%;
    background: functions.var($element + "-indicator", background, var(--color-progress-indicator));

    &::before,
    &::after {
      position: absolute;
      display: block;
      width: var(--_progress-padding);
      height: 100%;
      background: functions.var($element + "-indicator", background, var(--color-progress-indicator));
      content: "";
    }

    &::before {
      @include mixins.use-logical($element + "-indicator", border-radius, var(--_progress-border-radius) 0);
      @include mixins.use-logical($element + "-indicator", inset, auto 100% auto auto);
    }

    &::after {
      @include mixins.use-logical($element + "-indicator", border-radius, 0 var(--_progress-border-radius));
      @include mixins.use-logical($element + "-indicator", inset, auto auto auto 100%);
    }
  }
}
</style>

