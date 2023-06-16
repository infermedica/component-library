<template>
  <UiListItem
    :list-item-attrs="listItemAttrs"
  >
    <!-- @slot Use this slot to replace item-link template. -->
    <slot
      name="item-link"
      v-bind="{
        itemAttrs,
        itemTag,
        itemClass,
        label,
      }"
    >
      <UiButton
        v-bind="itemAttrs"
        :class="[
          'ui-stepper-step__content', itemClass
        ]"
      >
        <!-- @slot Use this slot to replace label template. -->
        <slot
          name="label"
          v-bind="{ label }"
        >
          {{ label }}
        </slot>
      </UiButton>
    </slot>
  </UiListItem>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'vue';
import useAttributes from '../../../../composable/useAttributes';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import UiListItem from '../../../organisms/UiList/_internal/UiListItem.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface StepperStepProps {
  /**
   * Use this props to pass index of current step.
   */
  index?: number;
  /**
   * Use this props to pass index of active step.
   */
  activeStepIndex?: number;
  /**
   * Use this props to set the step label.
   */
  label?: string;
}
export type StepperStepAttrsProps = DefineAttrsProps<StepperStepProps, ButtonAttrsProps>

const props = withDefaults(defineProps<StepperStepProps>(), {
  index: 0,
  activeStepIndex: 0,
  label: '',
});

const isCurrentStep = computed(() => props.index === props.activeStepIndex);
const isVisitedStep = computed(() => props.index < props.activeStepIndex);
const isInactiveStep = computed(() => props.index > props.activeStepIndex);

const listItemAttrs = computed(() => ({
  class: [
    'ui-stepper-step',
    {
      'ui-stepper-step--is-visited': isVisitedStep.value,
      'ui-stepper-step--is-current': isCurrentStep.value,
    },
  ],
}));
const itemClass = computed(() => (
  [
    'ui-button--text',
    'ui-button--theme-secondary',
    isInactiveStep.value ? 'ui-button--is-disabled' : '',
  ]
));

const {
  attrs, listeners,
} = useAttributes<ButtonHTMLAttributes | HTMLAttributes>();
const itemAttrs = computed<ButtonAttrsProps>(() => (isVisitedStep.value
  ? {
    ...listeners.value,
    ...attrs.value,
  }
  : {
    disabled: true,
    ...Object.keys(attrs.value).reduce((attributes: ButtonAttrsProps, attribute) => {
      if (!attribute.match(/(to|href)/)) {
        attributes[attribute] = attrs.value[attribute]; // eslint-disable-line no-param-reassign
      }
      return attributes;
    }, {}),
  }));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-stepper-step {
  $this: &;
  $element: stepper-step;

  --_stepper-step-indicator-width: #{functions.var($element + "-step-indicator", width, 4px)};
  --_list-item-content-padding-block: #{functions.var($element + "-button", padding-block, var(--space-10))};
  --_list-item-content-padding-inline: #{functions.var($element + "-button", padding-inline, 0 var(--space-8))};
  --list-item-content-padding-block: var(--_list-item-content-padding-block);
  --list-item-content-padding-inline: var(--_list-item-content-padding-inline);
  --list-item-tablet-content-padding-block: var(--_list-item-content-padding-block);
  --list-item-tablet-content-padding-inline: var(--_list-item-content-padding-inline);
  --list-item-content-hover-background: #{functions.var($element + "-content-hover", background, transparent)};

  display: flex;
  gap: functions.var($element, gap, var(--space-12));

  &::before {
    width: var(--_stepper-step-indicator-width);
    flex: none;
    background: functions.var($element + "-step-indicator", background, var(--color-progress-track));
    content: "";
    place-self: stretch;
  }

  &::after {
    @include mixins.override-logical(list-item, null, border-width, 0);
  }

  &--is-visited,
  &--is-current {
    &::before {
      background: functions.var($element + "-step-indicator", background, var(--color-progress-indicator));
    }

    #{$this}__content {
      --text-color: #{functions.var($element + "-content", color, revert)};
    }
  }

  &--is-current {
    --button-color: var(--color-text-body);
    --button-hover-color: var(--color-text-body);
    --button-active-color: var(--color-text-body);
    --button-font: var(--font-body-1-thick);

    #{$this}__content {
      cursor: auto;
    }
  }

  &__content {
    --text-color: #{functions.var($element + "-content", color, var(--color-text-disabled))};

    text-align: start;
  }
}
</style>
