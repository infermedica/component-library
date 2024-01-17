<template>
  <UiButton
    :aria-expanded="`${isOpen}`"
    class="ui-phone-number-prefix-toggle ui-button--outlined"
  >
    <slot />
    <UiIcon
      :icon="isDropdownOpen"
      class="ui-phone-number-prefix-toggle__icon ui-button__icon"
    />
  </UiButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../../atoms/UiIcon/UiIcon.vue';

export interface UiPhoneNumberPrefixPropsToggle {
  isOpen?: boolean,
}
const props = withDefaults(defineProps<UiPhoneNumberPrefixPropsToggle>(), { isOpen: false });

const isDropdownOpen = computed(() => (props.isOpen ? 'chevron-up' : 'chevron-down'));
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
  --button-border-block-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-border-inline-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-hover-border-block-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-hover-border-inline-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-active-border-block-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --button-active-border-inline-color: #{functions.var($element, border-color, var(--color-border-strong))};
  --border-radius-button: var(--border-radius-form);

  @include mixins.override-logical(button, $element, padding, var(--space-12) var(--space-12) var(--space-12) var(--space-16));

  width: functions.var($element, width, 100%);
  justify-content: functions.var($element, justify-content, space-between);
  font: functions.var($element, font, var(--font-body-1));
  letter-spacing: functions.var($element, letter-spacing, var(--font-body-1));
  text-align: functions.var($element, text-align, left);

  &__icon {
    --button-icon-color: #{functions.var($element + '-icon', color, var(--color-icon-primary))};
    --button-icon-color-hover: #{functions.var($element + '-hover-icon', color, var(--color-icon-primary-hover))};
    --button-icon-color-active: #{functions.var($element + '-active-icon', color, var(--color-icon-primary-active))};
    --button-icon-margin-inline-start: #{functions.var($element + '-icon', margin-inline-start, auto)};

    @include mixins.override-logical(button, null, margin, 0);
  }
}
</style>
