<template>
  <UiButton
    :aria-expanded="`${isOpen}`"
    class="ui-phone-number-prefix-toggle ui-button--outlined"
  >
    <slot /><UiIcon
      :icon="isOpen ? 'chevron-up' : 'chevron-down'"
      class="ui-phone-number-prefix-toggle__icon ui-button__icon"
    />
  </UiButton>
</template>

<script setup lang="ts">
import UiButton from '../../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../../atoms/UiIcon/UiIcon.vue';

export interface UiPhoneNumberPrefixPropsToggle {
  isOpen?: boolean,
}
withDefaults(defineProps<UiPhoneNumberPrefixPropsToggle>(), { isOpen: false });
</script>

<style lang="scss">
@use "../../../../../styles/mixins";
@use "../../../../../styles/functions";

.ui-phone-number-prefix-toggle {
  $this: &;
  $element: phone-number-prefix-toggle;

  --button-color: #{functions.var($element, color, var(--color-text-body))};
  --button-hover-color: #{functions.var($element, color, var(--color-text-body))};
  --button-active-color: #{functions.var($element, color, var(--color-text-body))};
  --button-background: #{functions.var($element, background, var(--color-background-white))};
  --button-hover-background: #{functions.var($element, background, var(--color-background-white))};
  --button-active-background: #{functions.var($element, background, var(--color-background-white))};
  --button-border-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-hover-border-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-active-border-color: #{functions.var($element, border-color, var(--color-border-strong))};

  @include mixins.override-logical(button, $element, padding, var(--space-12) var(--space-16) var(--space-12) var(--space-12));

  width: functions.var($element, width, 6.25rem);
  justify-content: functions.var($element, justify-content, space-between);
  font: functions.var($element, font, var(--font-body-1));
  letter-spacing: functions.var($element, letter-spacing, var(--font-body-1));

  &__icon {
    --button-icon-color: #{functions.var($element + '-icon', color, var(--color-icon-secondary))};
    --button-icon-color-hover: #{functions.var($element + '-hover-icon', color, var(--color-icon-secondary-hover))};
    --button-icon-color-active: #{functions.var($element + '-active-icon', color, var(--color-icon-secondary-active))};

    @include mixins.override-logical(button, null, margin, 0);
  }
}
</style>
