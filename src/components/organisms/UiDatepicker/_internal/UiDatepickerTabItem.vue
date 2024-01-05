<template>
  <UiButton class="ui-button--outlined ui-datepicker-tab-item">
    <slot />
  </UiButton>
</template>

<script setup lang="ts">
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { DefineAttrsProps } from '../../../../types';

export type DatepickerTabItemAttrsProps = DefineAttrsProps<null, ButtonAttrsProps>;
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-datepicker-tab-item {
  $this: &;
  $element: datepicker-tab-item;

  @include mixins.override-logical(button, $element, padding, var(--space-8));
  @include mixins.override-logical(button, $element, border-width, 0);
  @include mixins.override-logical(button, $element, border-radius, var(--space-8));

  --button-color: #{functions.var($element, color, var(--color-text-body))};
  --button-hover-color: #{functions.var($element + "-hover", color, var(--color-text-body))};
  --button-active-color: #{functions.var($element + "-active", color, var(--color-text-body))};
  --button-font: #{functions.var($element, font, var(--font-body-2-comfortable))};
  --button-letter-spacing: #{functions.var($element, letter-spacing, var(--letter-spacing-body-2-comfortable))};

  @include mixins.use-logical($element, margin, var(--space-4) 0 0 0);

  width: functions.var($element, width, calc(100% / 7));
  height: functions.var($element, height, 2.5rem);

  /* fixme: do something to remove this hack */
  /* stylelint-disable-next-line selector-class-pattern */
  &.ui-button--is-selected {
    --button-color: unset;
    --button-hover-color: unset;
    --button-active-color: unset;
  }

  /* fixme: do something to remove this hack */
  /* stylelint-disable-next-line selector-class-pattern */
  &.ui-button--is-disabled {
    --button-color: #{functions.var($element, color, var(--color-text-disabled))};
    --button-hover-color: #{functions.var($element + "-hover", color, var(--color-text-disabled))};
    --button-active-color: #{functions.var($element + "-active", color, var(--color-text-disabled))};
  }
}
</style>
