<template>
  <div class="ui-stepper">
    <!-- @slot Use this slot to replace the mobile stepper -->
    <slot
      name="mobile"
      v-bind="{currentStep, currentStepDisplayText, stepsProgress}"
    >
      <div class="ui-stepper__mobile">
        <!-- @slot Use this slot to replace text in the mobile stepper -->
        <slot
          name="current-step"
          v-bind="{currentStepDisplayText}"
        >
          <UiText
            tag="span"
            class="ui-text--body-2-comfortable ui-stepper__text"
          >
            {{ currentStepDisplayText }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace progress in the stepper -->
        <slot
          name="progress"
          v-bind="{stepsProgress}"
        >
          <UiProgress
            v-bind="progressAttrs"
            :min="0"
            :max="100"
            :value="stepsProgress"
            class="ui-stepper__progress"
          />
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace desktop version of the stepper -->
    <slot
      name="desktop"
      v-bind="{steps, currentStep, indexOfActiveStep, determineStep}"
    >
      <UiList class="ui-stepper__desktop">
        <!-- @slot Use this slot to replace items in the desktop list -->
        <slot
          name="items"
          v-bind="{steps, indexOfActiveStep, determineStep}"
        >
          <template
            v-for="(step, index) in steps"
            :key="index"
          >
            <!-- @slot Use this slot to replace item in the desktop list -->
            <slot
              name="item"
              v-bind="{step, index, indexOfActiveStep, determineStep}"
            >
              <UiListItem
                class="ui-stepper__step"
                :class="{
                  'ui-stepper__step--visited': indexOfActiveStep >= index,
                  'ui-stepper__step--current': indexOfActiveStep === index,
                }"
              >
                <!-- @slot Use this slot to replace items-link in the desktop list -->
                <slot
                  name="item-link"
                  v-bind="{step, index, indexOfActiveStep, determineStep}"
                >
                  <UiButton
                    v-bind="determineStep(index, step)"
                    class="ui-button--text ui-button--theme-secondary ui-stepper__item"
                  >
                    {{ step.name }}
                  </UiButton>
                </slot>
              </UiListitem>
            </slot>
          </template>
        </slot>
      </UiList>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiProgress from '../../atoms/UiProgress/UiProgress.vue';
import UiList from '../../organisms/UiList/UiList.vue';
import UiListItem from '../../organisms/UiList/_internal/UiListItem.vue';
import type { PropsAttrs } from '../../../types/attrs';

export interface Step {
  name: string;
  to: string;
  href: string;
  [key: string]: unknown;
}
export interface DetermineStep {
  to: string;
  class: string;
}
const props = defineProps({
  /**
   * Use this props to set the steps in the stepper.
   */
  steps: {
    type: Array as PropType<Step[]>,
    default: () => [
      {
        name: '',
        route: '',
      },
    ],
  },
  /**
   * Use this props to set the current step in the stepper.
   */
  currentStep: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for UiProgress.
   */
  progressAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const stepsLength = computed(() => props.steps.length);
const indexOfActiveStep = computed(() => props.steps.findIndex((step) => step.name === props.currentStep));
const currentStepDisplayNumber = computed(() => indexOfActiveStep.value + 1);
const currentStepDisplayText = computed(() => `
      ${currentStepDisplayNumber.value}/${props.steps.length} ${props.currentStep}
    `);
const stepsProgress = computed(() => (currentStepDisplayNumber.value / stepsLength.value) * 100);
const determineStep = (itemIndex: number, step: Step): DetermineStep => ({
  tag: itemIndex >= indexOfActiveStep.value ? 'span' : undefined,
  class: itemIndex <= indexOfActiveStep.value ? undefined : 'ui-button--is-disabled',
  ...step,
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-stepper {
  $this: &;
  $element: stepper;

  --space-10: calc(var(--space-20) / 2); //pixel perfect hack

  padding: css-var($element, padding, var(--space-12) var(--space-20));
  background: css-var($element, background, var(--color-background-subtle));

  @include from-desktop {
    padding: css-var($element, padding, 0);
    background: css-var($element + "-desktop", background, transparent);
  }

  &__mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include from-desktop {
      display: none;
    }
  }

  &__progress {
    width: css-var($element + "-progress", width, 6rem);

    @include from-tablet {
      width: css-var($element + "-tablet-progress", width, 11.25rem);
    }
  }

  &__desktop {
    display: none;

    @include from-desktop {
      display: flex;
      flex-direction: column;
    }
  }

  &__step {
    --_stepper-step-indicator-width: #{css-var($element + "-step-indicator", width, 4px)};
    --list-item-padding:
      #{css-var(
        $element + "-step",
        padding,
        var(--space-10) var(--space-8) var(--space-10) calc(var(--space-12) + var(--_stepper-step-indicator-width))
      )};

    position: relative;

    [dir="rtl"] & {
      --list-item-padding:
        #{css-var(
          $element + "-step",
          padding,
          var(--space-10) calc(var(--space-12) + var(--_stepper-step-indicator-width)) var(--space-10) var(--space-8)
        )};
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--_stepper-step-indicator-width);
      height: 100%;
      background: css-var($element + "-step-indicator", background, var(--color-progress-track));
      content: "";

      [dir="rtl"] & {
        right: 0;
        left: auto;
      }
    }

    &--visited {
      &::after {
        background: css-var($element + "-step-indicator", background, var(--color-progress-indicator));
      }
    }

    &--current {
      #{$this}__item {
        --button-color: #{css-var($element + "-item", color, var(--color-text-body))};
        --button-font: #{css-var($element + "-item", font, var(--font-body-1-thick))};
        --button-letter-spacing: #{css-var($element + "-item", letter-spacing, var(--letter-spacing-body-1-thick))};

        cursor: auto;
      }
    }
  }

  &__item {
    --button-color: #{css-var($element + "-item", color, var(--color-text-action-secondary))};
    --button-font: #{css-var($element + "-item", font, var(--font-body-1))};
    --button-letter-spacing: #{css-var($element + "-item", letter-spacing, var(--letter-spacing-body-1))};

    text-align: left;

    [dir="rtl"] & {
      text-align: right;
    }
  }
}
</style>
