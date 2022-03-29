<template>
  <div
    class="ui-notification"
    :class="rootClassModifier"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
     * Use this props to set notification type.
     */
  type: {
    type: String,
    required: false,
    default: 'error',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value),
  },
});
const rootClassModifier = computed(() => `ui-notification--${props.type}`);
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-notification {
  @include inner-border($element: notification, $radius: var(--border-radius-container), $color: transparent);

  --alert-icon-margin: 0 var(--space-12) 0 0;

  display: flex;
  flex-direction: column;
  padding: var(--notification-padding, var(--space-12));
  background: var(--notification-background);

  [dir="rtl"] & {
    --alert-icon-margin: 0 0 0 var(--space-12);
  }

  &--success {
    --notification-background: var(--notification-success-background-color, var(--color-background-success));
    --notification-border: solid var(--notification-success-border-color, var(--color-border-success-subtle));
  }

  &--info {
    --notification-background: var(--notification-info-background-color, var(--color-background-info));
    --notification-border: solid var(--notification-info-border-color, var(--color-border-info-subtle));
  }

  &--warning {
    --notification-background: var(--notification-warning-background-color, var(--color-background-warning));
    --notification-border: solid var(--notification-warning-border-color, var(--color-border-warning-subtle));
  }

  &--error {
    --notification-background: var(--notification-error-background-color, var(--color-background-error));
    --notification-border: solid var(--notification-error-border-color, var(--color-border-error-subtle));
  }
}
</style>
