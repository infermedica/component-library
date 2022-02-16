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
import UiIcon from '../UiIcon/UiIcon.vue';
import UiText from '../UiText/UiText.vue';

const props = defineProps({
  /**
   * Use this props to set alert type.
   */
  type: {
    type: String,
    required: false,
    default: 'error',
    validator: (value) => ['default', 'success', 'info', 'warning', 'error'].includes(value),
  },
});
const rootClassModifier = computed(() => `ui-alert--${props.type}`);
const icon = computed(() => {
  if (props.type === 'default') return '';
  if (props.type === 'success' || props.type === 'info') return `${props.type}-filled`;
  if (props.type === 'warning') return `${props.type}-filled`;
  return 'error-filled';
});
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-alert {
  $this: &;

  display: inline-flex;
  align-items: flex-start;
  background: var(--alert-background);
  border: var(--alert-border);
  border-width: var(--alert-border-width);

  &__icon {
    --icon-size: var(--alert-icon-size, 1.5rem);
    --icon-color: var(--alert-icon-color, var(--color-icon-error));

    flex: none;
    margin: var(--alert-icon-margin, 0 var(--space-4) 0 0);

    [dir=rtl] & {
      margin: var(--alert-icon-margin, 0 0 0 var(--space-4));
    }
  }

  &__message {
    @include font(body-2-comfortable);

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

    #{$this}__message {
      @include font(body-1);
    }
  }
}
</style>
