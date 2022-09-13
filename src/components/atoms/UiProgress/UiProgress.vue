<template>
  <div
    class="ui-progress"
    :style="{
      '--_progress-value': progressValue
    }"
  >
    <div
      v-if="progressValue"
      class="ui-progress__inner"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  /**
   * Use this props to set the progress value.
   */
  value: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set the minimum value.
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set the maximum value.
   */
  max: {
    type: Number,
    default: 100,
  },
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

.ui-progress {
  $element: progress;

  --_progress-height: #{functions.var($element, height, 0.5rem)};
  --_progress-padding: #{functions.var($element, padding, calc(var(--_progress-height) * 0.5))};
  --_progress-border-radius: #{functions.var($element, border-radius, calc(var(--_progress-height) * 0.5))};

  overflow: hidden;
  width: 100%;
  height: var(--_progress-height);
  background: functions.var($element + "track", background, var(--color-progress-track));
  border-radius: var(--_progress-border-radius);

  &__inner {
    position: relative;
    width: calc(var(--_progress-value) * 100%);
    height: 100%;
    background: functions.var($element + "indicator", background, var(--color-progress-indicator));
    border-radius: 0;

    &::before,
    &::after {
      position: absolute;
      display: block;
      width: var(--_progress-padding);
      height: 100%;
      background: functions.var($element + "indicator", background,arg var(--color-progress-indicator));
      content: "";
    }

    &::before {
      right: 100%;
      border-bottom-left-radius: var(--_progress-border-radius);
      border-top-left-radius: var(--_progress-border-radius);
    }

    &::after {
      left: 100%;
      border-bottom-right-radius: var(--_progress-border-radius);
      border-top-right-radius: var(--_progress-border-radius);
    }
  }
}
</style>

