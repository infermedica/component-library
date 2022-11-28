<template>
  <div class="ui-progressbar">
    <UiProgress
      v-bind="progressAttrs"
      :value="value"
      :max="100"
      class="ui-progressbar__progress"
    />
    <div class="ui-progressbar__steps">
      <template
        v-for="dot in stepsDots"
        :key="dot"
      >
        <div
          class="ui-progressbar__step"
          :style="{ '--_progressbar-step-left': `${100 / steps * dot}%` }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiProgress from '../../atoms/UiProgress/UiProgress.vue';

const props = defineProps({
  /**
   * Use this props to set steps.
   */
  steps: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set current step.
   */
  currentStep: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to pass attrs for UiProgress
   */
  progressAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const value = computed(() => ((100 / props.steps) * props.currentStep));
const stepsDots = computed(() => (props.steps - 1));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-progressbar {
  $element: progressbar;

  --progress-height: #{functions.var($element, height, 1rem)};

  position: relative;

  &__steps {
    @include mixins.use-logical($element + "-steps", inset, 0 0 auto auto);

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  &__step {
    --_progressbar-step-size: #{functions.var($element + "-step", size, 0.625rem)};

    @include mixins.use-logical($element + "-step", margin, 3px 0);
    @include mixins.use-logical($element + "-step", border-radius, var(--border-radius-circle));

    position: absolute;
    left: var(--_progressbar-step-left);
    width: var(--_progressbar-step-size);
    height: var(--_progressbar-step-size);
    background: functions.var($element + "-step", background, var(--color-icon-on-selection));
    transform: translateX(-50%);
  }
}
</style>
