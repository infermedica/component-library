<template>
  <div
    class="ui-progress"
    :style="{'--progress-value': progressValue}"
  >
    <div
      v-if="progressValue"
      class="ui-progress__inner"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
});
const progressValue = computed(() => {
  const progress = (props.value - props.min) / (props.max - props.min);
  if (isNaN(progress)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[UiProgress error]: The result of progress calculation is NaN');
    }
    return 0;
  }
  return progress;
});
</script>

<style lang="scss">
.ui-progress {
  --height: var(--progress-height, 0.5rem);
  --bar-padding: var(--progress-bar-padding, calc(var(--height) * 0.5));
  --radius-pill: var(--progress-radius-pill, calc(var(--height) * 0.5));

  position: relative;
  width: var(--progress-width, 100%);
  height: var(--height);
  padding: var(--progress-padding, 0 var(--bar-padding));
  overflow: hidden;
  background-color: var(--progress-background, var(--color-progress-track));
  border: var(--progress-border, 0);
  border-radius: var(--radius-pill);

  &__inner {
    position: relative;
    width: calc(var(--progress-value) * 100%);
    height: 100%;
    background-color: var(--progress-value-background, var(--color-progress-indicator));
    border-radius: var(--progress-value-radius, 0);

    &::before,
    &::after {
      position: absolute;
      display: block;
      width: var(--bar-padding);
      height: 100%;
      content: '';
      background-color: var(--progress-value-background, var(--color-progress-indicator));
    }

    &::before {
      right: 100%;
      border-top-left-radius: var(--radius-pill);
      border-bottom-left-radius: var(--radius-pill);
    }

    &::after {
      left: 100%;
      border-top-right-radius: var(--radius-pill);
      border-bottom-right-radius: var(--radius-pill);
    }
  }
}
</style>

