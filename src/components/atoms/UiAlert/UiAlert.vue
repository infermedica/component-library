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

<script>
import { computed } from 'vue';
import UiIcon from '../UiIcon/UiIcon.vue';
import UiText from '../UiText/UiText.vue';

export default {
  name: 'UiAlert',
  components: {
    UiIcon,
    UiText,
  },
  props: {
    /**
     * Use this props to set alert type.
     */
    type: {
      type: String,
      required: false,
      default: 'error',
      validator: (value) => ['default', 'success', 'info', 'warning', 'error'].includes(value),
    },
  },
  setup(props) {
    const rootClassModifier = computed(() => `ui-alert--${props.type}`);
    const icon = computed(() => {
      if (props.type === 'default') return '';
      if (props.type === 'success' || props.type === 'info') return props.type;
      return 'exclamation';
    });

    return {
      rootClassModifier,
      icon,
    };
  },
};
</script>

<style lang="scss">
.ui-alert {
  display: inline-flex;
  align-items: center;
  background: var(--alert-background);
  border: var(--alert-border);
  border-width: var(--alert-border-width);

  &__icon {
    --icon-size: var(--alert-icon-size, 1.5rem);
    --icon-color: var(--alert-icon-color, var(--color-alert-error-icon));
  }

  &__message {
    margin: 0 0 0 var(--space-8);
    font: var(--alert-font, var(--font-body-2-comfortable));
    color: var(--alert-color, var(--color-text-body));
  }

  &--success {
    --alert-icon-color: var(--color-alert-success-icon);
    --alert-color: var(--color-alert-success-text);
  }

  &--info {
    --alert-icon-color: var(--color-alert-info-icon);
    --alert-color: var(--color-alert-info-text);
  }

  &--warning {
    --alert-icon-color: var(--color-alert-warning-icon);
    --alert-color: var(--color-alert-warning-text);
  }

  &--error {
    --alert-icon-color: var(--color-alert-error-icon);
    --alert-color: var(--color-alert-error-text);
  }
}
</style>
