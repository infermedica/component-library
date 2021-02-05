<template>
  <div
    class="ui-notification"
    :class="rootClassModifier"
  >
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiNotification',
  props: {
    /**
     * Use this props to set notification type.
     */
    type: {
      type: String,
      required: false,
      default: 'error',
      validator: (value) => ['success', 'info', 'warning', 'error'].includes(value),
    },
  },
  setup(props) {
    const rootClassModifier = computed(() => `ui-notification--${props.type}`);

    return {
      rootClassModifier,
    };
  },
};
</script>

<style lang="scss">
.ui-notification {
  --alert-message-margin: 0 0 0 var(--space-12);

  display: flex;
  flex-direction: column;
  padding: var(--notification-padding, var(--space-12));
  background: var(--notification-background);
  border: var(--notification-border);
  border-width: 1px;
  border-radius: var(--notification-border-radius, var(--border-radius-card));

  &--success {
    --notification-background: var(--notification-success-backgroud-color, var(--color-alert-success-bg));
    --notification-border: solid var(--notification-success-border-color, var(--color-alert-success-border));
  }

  &--info {
    --notification-background: var(--notification-info-backgroud-color, var(--color-alert-info-bg));
    --notification-border: solid var(--notification-info-border-color, var(--color-alert-info-border));
  }

  &--warning {
    --notification-background: var(--notification-warning-backgroud-color, var(--color-alert-warning-bg));
    --notification-border: solid var(--notification-warning-border-color, var(--color-alert-warning-border));
  }

  &--error {
    --notification-background: var(--notification-error-backgroud-color, var(--color-alert-error-bg));
    --notification-border: solid var(--notification-error-border-color, var(--color-alert-error-border));
  }
}
</style>
