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
          :style="{
            '--progressbar-step-left': `${100 / steps * dot}%`
          }"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
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
    type: Object,
    default: () => ({}),
  },
});
const value = computed(() => ((100 / props.steps) * props.currentStep));
const stepsDots = computed(() => (props.steps - 1));
</script>

<style lang="scss">
.ui-progressbar {
  --progress-height: 1rem;

  position: relative;
  height: 1rem;

  &__steps {
    position: absolute;
    top: 50%;
    display: flex;
    width: 100%;
    align-items: center;
    transform: translate(0, -50%);
  }

  &__step {
    position: absolute;
    left: var(--progressbar-step-left);
    width: var(--progressbar-step-size, 0.625rem);
    height: var(--progressbar-step-size, 0.625rem);
    background-color: var(--color-white);
    border-radius: var(--border-radius-circle);
    transform: translate(calc(-100% - calc(var(--progressbar-step-size, 0.625rem) / 2)), 0);
  }

  &__progress {
    --progress-bar-padding: 0;
    --progress-value-radius: 0.5rem;

    position: absolute;
  }
}
</style>
