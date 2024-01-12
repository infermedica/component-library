<template>
  <div
    :class="[
      'ui-progressbar', { 'ui-progressbar--has-label': label },
    ]"
  >
    <slot
      name="label"
      v-bind="{
        label,
        steps,
        currentStep,
      }"
    >
      <UiText v-if="label">
        {{ label }}
      </UiText>
    </slot>
    <slot
      name="progress"
      v-bind="{
        value,
        stepsDots,
        steps,
        currentStep,
        progressAttrs,
      }"
    >
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
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiProgress from '../../atoms/UiProgress/UiProgress.vue';
import type { ProgressAttrsProps } from '../../atoms/UiProgress/UiProgress.vue';
import type { DefineAttrsProps } from '../../../types';

export interface ProgressbarProps {
  /**
   * Use this props to set steps.
   */
  steps?: number;
  /**
   * Use this props to set current step.
   */
  currentStep?: number;
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to pass attrs for UiProgress
   */
  progressAttrs?: ProgressAttrsProps;
}
export type ProgressbarAttrsProps = DefineAttrsProps<ProgressbarProps>;

const props = withDefaults(defineProps<ProgressbarProps>(), {
  steps: 0,
  currentStep: 0,
  label: '',
  progressAttrs: () => ({}),
});
const value = computed(() => ((100 / props.steps) * props.currentStep));
const stepsDots = computed(() => (props.steps - 1));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";
// 11.25rem;
.ui-progressbar {
  $this: &;
  $element: progressbar;

  --progress-height: #{functions.var($element, height, 1rem)};

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__progress {
    width: #{functions.var($element, width, 100%)};
  }

  &__steps {
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

  &--has-label {
    --progress-height: unset;
    --progressbar-step-size: 0;

    #{$this}__progress {
      width: #{functions.var($element + '-progress', width, 11.25rem)};
    }
  }
}
</style>
