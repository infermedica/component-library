<template>
  <div class="ui-stepper">
    <!-- @slot Use this slot to replace the mobile stepper -->
    <slot
      name="mobile"
      v-bind="{
        currentStepDisplayText,
        progressAttrs: defaultProps.progressAttrs,
      }"
    >
      <div class="ui-stepper__mobile">
        <!-- @slot Use this slot to replace text in the mobile stepper -->
        <slot
          name="current-step"
          v-bind="{ currentStepDisplayText }"
        >
          <UiText
            tag="span"
            class="ui-text--body-2-comfortable ui-stepper__current-step"
          >
            {{ currentStepDisplayText }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace progress in the stepper -->
        <slot
          name="progress"
          v-bind="{ progressAttrs: defaultProps.progressAttrs, }"
        >
          <UiProgress
            v-bind="defaultProps.progressAttrs"
            class="ui-stepper__progress"
          />
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace desktop version of the stepper -->
    <slot
      name="desktop"
      v-bind="{
        steps: stepsToRender,
        currentStep,
        indexOfActiveStep,
        stepperStepAttrs,
      }"
    >
      <UiList class="ui-stepper__desktop">
        <!-- TODO: rename items, item to steps, step to keep name consistency -->
        <!-- @slot Use this slot to replace items in the desktop list -->
        <slot
          name="items"
          v-bind="{
            steps: stepsToRender,
            indexOfActiveStep,
            stepperStepAttrs,
          }"
        >
          <template
            v-for="(step, index) in stepsToRender"
            :key="index"
          >
            <!-- @slot Use this slot to replace item in the desktop list -->
            <slot
              name="item"
              v-bind="{
                step,
                index,
                indexOfActiveStep,
                stepperStepAttrs,
              }"
            >
              <UiStepperStep
                :index="index"
                :active-step-index="indexOfActiveStep"
                v-bind="stepperStepAttrs(step)"
              >
                <template #item-link="data">
                  <slot
                    name="item-link"
                    v-bind="data"
                  />
                </template>
              </UiStepperStep>
            </slot>
          </template>
        </slot>
      </UiList>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiProgress from '../../atoms/UiProgress/UiProgress.vue';
import type { ProgressAttrsProps } from '../../atoms/UiProgress/UiProgress.vue';
import UiList from '../../organisms/UiList/UiList.vue';
import UiStepperStep from './_internal/UiStepperStep.vue';
import type { StepperStepAttrsProps } from './_internal/UiStepperStep.vue';
import type { DefineAttrsProps } from '../../../types';

// TODO: after 0.6.0. we can remove StepperRenderItem type and use StepperStepAttrsProps instead.
export type StepperRenderItem = {
  name?: string;
} & StepperStepAttrsProps;
export interface StepperProps {
  /**
   * Use this props to set the steps in the stepper.
   */
  steps?: StepperRenderItem[];
  /**
   * Use this props to set the current step in the stepper.
   */
  currentStep?: string;
  /**
   * Use this props to pass attrs for UiProgress.
   */
  progressAttrs?: ProgressAttrsProps;
}
export type StepperAttrsProps = DefineAttrsProps<StepperProps>;

const props = withDefaults(defineProps<StepperProps>(), {
  steps: () => [ { label: '' } ],
  currentStep: '',
  progressAttrs: () => ({}),
});
const stepsLength = computed(() => props.steps.length);
const indexOfActiveStep = computed(() => props.steps.findIndex((step) => step.label === props.currentStep));
const currentStepDisplayNumber = computed(() => indexOfActiveStep.value + 1);
const currentStepDisplayText = computed(() => `
      ${currentStepDisplayNumber.value}/${props.steps.length} ${props.currentStep}
    `);
const stepsProgress = computed(() => (currentStepDisplayNumber.value / stepsLength.value) * 100);
const defaultProps = computed<StepperProps>(() => ({
  progressAttrs: {
    min: 0,
    max: 100,
    value: stepsProgress.value,
    ...props.progressAttrs,
  },
}));
// TODO: after 0.6.0. we should use StepperStepAttrsProps instead StepperRenderItem.
const stepperStepAttrs = (step: StepperRenderItem) => {
  const { ...rest } = step;
  return rest;
};
// TODO: remove in 0.6.0 / BEGIN
if (props.steps.some((step) => step.name)) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiStepper]: The step `name` props will be removed in 0.6.0. Please use step `label` props instead.');
  }
}
const stepsToRender = computed<StepperProps['steps']>(() => props.steps.map((step) => ({
  ...step,
  label: step.name || step.label,
})));
// END
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-stepper {
  $this: &;
  $element: stepper;

  --space-10: calc(var(--space-20) / 2); //pixel perfect hack

  @include mixins.use-logical($element, padding, var(--space-12) var(--space-20));

  background: functions.var($element, background, var(--color-background-subtle));

  @include mixins.from-desktop {
    @include mixins.use-logical($element, padding, 0);

    background: functions.var($element + "-desktop", background, transparent);
  }

  &__mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mixins.from-desktop {
      display: none;
    }
  }

  &__progress {
    width: functions.var($element + "-progress", width, 6rem);

    @include mixins.from-tablet {
      width: functions.var($element + "-tablet-progress", width, 11.25rem);
    }
  }

  &__desktop {
    display: none;

    @include mixins.from-desktop {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
