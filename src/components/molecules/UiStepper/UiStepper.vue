<template>
  <UiList class="ui-stepper">
    <!--
      @slot Use this slot to replace items in the list
      @binding {StepperStepAttrsProps[]} steps
      @binding {number} activeStepIndex
      @binding {StepperStepAttrsProps} stepperStepAttrs
    -->
    <slot
      name="items"
      v-bind="{
        steps: stepsToRender,
        activeStepIndex,
        stepperStepAttrs,
      }"
    >
      <template
        v-for="(step, index) in stepsToRender"
        :key="index"
      >
        <!--
          @slot Use this slot to replace item in the list
          @binding {StepperStepAttrsProps} steps
          @binding {number} index
          @binding {number} activeStepIndex
          @binding {StepperStepAttrsProps} stepperStepAttrs
        -->
        <slot
          name="item"
          v-bind="{
            step,
            index,
            activeStepIndex,
            stepperStepAttrs,
          }"
        >
          <UiStepperStep
            :index="index"
            :active-step-index="activeStepIndex"
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiList from '../../organisms/UiList/UiList.vue';
import UiStepperStep from './_internal/UiStepperStep.vue';
import type { StepperStepAttrsProps } from './_internal/UiStepperStep.vue';
import type { DefineAttrsProps } from '../../../types';

export interface StepperProps {
  /**
   * Use this props to set the steps in the stepper.
   */
  steps?: StepperStepAttrsProps[];
  /**
   * Use this props to set the current step in the stepper.
   */
  currentStep?: string;
}
export type StepperAttrsProps = DefineAttrsProps<StepperProps>;

const props = withDefaults(defineProps<StepperProps>(), {
  steps: () => [ { label: '' } ],
  currentStep: '',
});
const activeStepIndex = computed(() => props.steps.findIndex((step) => step.label === props.currentStep));
const stepperStepAttrs = (step: StepperStepAttrsProps) => {
  const { ...rest } = step;
  return rest;
};
const stepsToRender = computed<StepperProps['steps']>(() => props.steps.map((step) => ({
  ...step,
  label: step.label,
})));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-stepper {
  $this: &;
  $element: stepper;

  flex-direction: column;
}
</style>
