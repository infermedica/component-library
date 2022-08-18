<template>
  <UiButton class="ui-button--outlined ui-datepicker-tab-item">
    <slot />
  </UiButton>
</template>

<script setup>
import UiButton from '../../../atoms/UiButton/UiButton.vue';
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";
@import "../../../../styles/functions/functions";

.ui-datepicker-tab-item {
  $this: &;
  $element: datepicker-tab-item;

  --button-padding: #{css-var($element, padding, var(--space-8))};
  --button-border-width: #{css-var($element, border-width, 0)};
  --button-color: #{css-var($element, color, var(--color-text-body))};
  --button-hover-color: #{css-var($element + "-hover", color, var(--color-text-body))};
  --button-active-color: #{css-var($element + "-active", color, var(--color-text-body))};
  --button-font: #{css-var($element, font, var(--font-body-2-comfortable))};
  --button-letter-spacing: #{css-var($element, letter-spacing, var(--letter-spacing-body-2-comfortable))};

  width: css-var($element, width, calc(100% / 7));
  height: css-var($element, height, 2.5rem);
  margin: css-var($element, margin, var(--space-4) 0 0 0);

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
    --button-color: #{css-var($element, color, var(--color-text-disabled))};
    --button-hover-color: #{css-var($element + "-hover", color, var(--color-text-disabled))};
    --button-active-color: #{css-var($element + "-active", color, var(--color-text-disabled))};
  }
}
</style>
