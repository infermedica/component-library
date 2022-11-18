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
      <component
        v-bind="itemAttrs"
        :is="itemTag"
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
      </component>
    </slot>
  </UiListItem>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import useAttributes from '../../../../composable/useAttributes';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiListItem from '../../../organisms/UiList/_internal/UiListItem.vue';

const props = defineProps({
  /**
   * Use this props to pass index of current step.
   */
  index: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to pass index of active step.
   */
  indexOfActiveStep: {
    type: Number,
    default: 0,
  },
  /**
   * Use this props to set the step label.
   */
  label: {
    type: String,
    default: '',
  },
});
const isCurrentStep = computed(() => props.index === props.indexOfActiveStep);
const isVisitedStep = computed(() => props.index < props.indexOfActiveStep);
const listItemAttrs = computed(() => ({
  class: [
    'ui-stepper-step',
    {
      'ui-stepper-step--is-visited': isVisitedStep.value,
      'ui-stepper-step--is-current': isCurrentStep.value,
    },
  ],
}));
const itemTag = computed(() => (isVisitedStep.value
  ? UiButton
  : UiText));
const itemClass = computed(() => (isVisitedStep.value
  ? [
    'ui-button--text',
    'ui-button--theme-secondary',
  ]
  : [ { 'ui-text--body-1-thick': isCurrentStep.value } ]
));
const {
  attrs, listeners,
} = useAttributes();
const itemAttrs = computed(() => (isVisitedStep.value
  ? {
    ...listeners.value,
    ...attrs.value,
  }
  : {
    tag: 'span',
    ...Object.keys(attrs.value).reduce((attributes, attribute) => {
      if (!attribute.match(/(to|href)/)) {
        attributes[attribute] = attrs.value[attribute];
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
  --_list-item-content-padding: #{functions.var($element + "-button", padding, var(--space-10) var(--space-8) var(--space-10) 0)};
  --list-item-content-padding: var(--_list-item-content-padding);
  --list-item-tablet-content-padding: var(--_list-item-content-padding);
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
    --list-item-border-width: 0;
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

  &__content {
    --text-color: #{functions.var($element + "-content", color, var(--color-text-disabled))};

    text-align: start;
  }
}
</style>
