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
      <UiText class="ui-text--body-2-comfortable ui-alert__message">
        <!-- @slot Use this slot to place message inside alert. -->
        <slot />
      </UiText>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export type BasicAlertIcon = 'success' | 'info' | 'warning' | 'error';
export type AlertType = BasicAlertIcon | 'default';
export type AlertIcon = `${BasicAlertIcon}-filled` | '';
const props = defineProps({
  /**
   * Use this props to set alert type.
   */
  type: {
    type: String as PropType<AlertType>,
    required: false,
    default: 'error',
  },
  /**
   * Use this props to hide icon.
   */
  hasIcon: {
    type: Boolean,
    default: true,
  },
});
const rootClassModifier = computed<`ui-alert--${AlertType}`>(() => `ui-alert--${props.type}`);
const icon = computed<AlertIcon>(() => ((!props.hasIcon || props.type === 'default') ? '' : `${props.type}-filled`));
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-alert {
  $this: &;
  $element: alert;
  $types: "success", "info", "warning", "error";

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  vertical-align: css-var($element, vertical-align, top);

  &__icon {
    --icon-color: #{css-var($element + "-icon", color)};

    flex: none;
    margin: css-var($element + "-icon", margin, 0 var(--space-4) 0 0);

    [dir="rtl"] & {
      margin: css-var($element + "-rtl-icon", margin, 0 0 0 var(--space-4));
    }
  }

  &__message {
    --text-color: #{css-var($element + "-message", text-color, var(--color-text-body))};
  }

  @each $type in $types {
    &--#{$type} {
      #{$this}__icon {
        --icon-color: #{css-var($element + "-icon", color, var(--color-icon-#{$type}))};
      }

      #{$this}__message {
        --text-color: #{css-var($element + "-message", text-color, var(--color-text-#{$type}))};
      }
    }
  }
}
</style>
