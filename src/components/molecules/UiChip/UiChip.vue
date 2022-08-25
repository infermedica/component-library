<template>
  <div class="ui-chip">
    <!-- @slot Use this slot to replace label template. -->
    <slot name="label">
      <!-- @slot Use this slot to place content inside chip. -->
      <UiText class="body-2-comfortable ui-chip__label">
        <slot />
      </UiText>
    </slot>
    <!-- @slot Use this slot to replace remove template. -->
    <slot
      name="remove"
      v-bind="{clickHandler, attrs: buttonAttrs}"
    >
      <UiButton
        v-bind="buttonAttrs"
        class="ui-button--icon ui-button--circled ui-chip__remove"
        @click="clickHandler"
      >
        <UiIcon
          icon="remove-filled"
          class=" ui-button__icon ui-chip__icon"
        />
      </UiButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { PropsAttrs } from '../../../types/attrs';

defineProps({
  /**
   * Use this props to pass attrs for UiButton
   */
  buttonAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e:'remove'): void}>();
function clickHandler(): void {
  emit('remove');
}
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-chip {
  $this: &;
  $element: chip;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: functions.var($element, padding, var(--space-4) var(--space-4) var(--space-4) var(--space-12));
  background: functions.var($element, background, var(--color-chip-background));
  border-radius: functions.var($element, border-radius, var(--border-radius-pill));

  [dir="rtl"] & {
    padding: functions.var($element + "-rtl", padding, var(--space-4) var(--space-12) var(--space-4) var(--space-4));
  }

  &__label {
    --text-color: #{functions.var($element + "-label", color, var(--color-chip-text))};
  }

  &__icon {
    --_remove-filled-close: #{functions.var($element + "-remove-filled-close", color, var(--color-chip-icon))};
    --button-icon-color: #{functions.var($element + "-icon", color, var(--color-chip-icon-background))};
    --button-hover-icon-color: #{functions.var($element + "-icon-hover", color, var(--color-chip-icon-background-hover))};
    --button-active-icon-color: #{functions.var($element + "-icon-active", color, var(--color-chip-icon-background-active))};

    margin: functions.var($element + "-icon", margin, -2px);
  }

  &__remove {
    margin: functions.var($element + "-remove", margin, var(--space-2) var(--space-2) var(--space-2) var(--space-4));

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-remove", margin, var(--space-2) var(--space-4) var(--space-2) var(--space-2));
    }
  }
}
</style>
