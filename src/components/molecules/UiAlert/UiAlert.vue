<template>
  <div
    class="ui-alert"
    :class="rootClassModifier"
    role="alert"
  >
    <!-- @slot Use this slot to replace icon template. -->
    <slot name="icon">
      <UiIcon
        v-if="icon"
        :icon="icon"
        class="ui-alert__icon"
      />
    </slot>
    <!-- @slot Use this slot to replace message template. -->
    <slot name="message">
      <UiText class="ui-alert__message">
        <!-- @slot Use this slot to place message inside alert. -->
        <slot />
      </UiText>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
   * Use this props to set alert type.
   */
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value),
  },
  /**
   * Use this props to hide icon.
   */
  hasIcon: {
    type: Boolean,
    default: true,
  },
});
const rootClassModifier = computed(() => `ui-alert--${props.type}`);
const icon = computed(() => {
  if (!props.hasIcon) return '';
  if (props.type === 'success' || props.type === 'info') return `${props.type}-filled`;
  if (props.type === 'warning') return `${props.type}-filled`;
  return 'error-filled';
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-alert {
  @include inner-border($element: alert, $color: transparent, $width: 0);
  $this: &;

  display: inline-flex;
  align-items: flex-start;
  background: var(--alert-background);

  &__icon {
    --icon-size: var(--alert-icon-size, 1.5rem);
    --icon-color: var(--alert-icon-color, var(--color-icon-error));

    flex: none;
    margin: var(--alert-icon-margin, 0 var(--space-4) 0 0);

    [dir="rtl"] & {
      margin: var(--alert-icon-margin, 0 0 0 var(--space-4));
    }
  }

  &__message {
    @include font(alert-message, body-2-comfortable, text);

    color: var(--alert-color, var(--color-text-body));
  }

  &--success {
    --alert-icon-color: var(--color-icon-success);
    --alert-color: var(--color-text-success);
  }

  &--info {
    --alert-icon-color: var(--color-icon-info);
    --alert-color: var(--color-text-info);
  }

  &--warning {
    --alert-icon-color: var(--color-icon-warning);
    --alert-color: var(--color-text-warning);
  }

  &--error {
    --alert-icon-color: var(--color-icon-error);
    --alert-color: var(--color-text-error);
  }

  &--secondary {
    --alert-color: var(--color-text-body);
    --alert-message-font: var(--font-body-1);
    --alert-message-letter-spacing: var(--letter-spacing-body-1);
  }
}
</style>
