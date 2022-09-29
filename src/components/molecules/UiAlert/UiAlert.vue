<template>
  <div
    class="ui-alert"
    :class="rootClassModifier"
    role="alert"
  >
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{
        iconAlertAttrs: defaultProps.iconAlertAttrs
      }"
    >
      <UiIcon
        v-if="defaultProps.iconAlertAttrs.icon"
        v-bind="defaultProps.iconAlertAttrs"
        class="ui-alert__icon"
      />
    </slot>
    <!-- @slot Use this slot to replace message template. -->
    <slot
      name="message"
      v-bind="{
        textMessageAttrs,
      }"
    >
      <UiText
        v-bind="textMessageAttrs"
        class="ui-text--body-2-comfortable ui-alert__message"
      >
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
  /**
   * Use this props to pass attrs for UiIcon
   */
  iconAlertAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for message UiText
   */
  textMessageAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const rootClassModifier = computed<`ui-alert--${AlertType}`>(() => `ui-alert--${props.type}`);
const icon = computed<AlertIcon>(() => ((!props.hasIcon || props.type === 'default') ? '' : `${props.type}-filled`));
const defaultProps = computed(() => ({
  iconAlertAttrs: {
    icon: icon.value,
    ...props.iconAlertAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-alert {
  $this: &;
  $element: alert;
  $types: "success", "info", "warning", "error";

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  vertical-align: functions.var($element, vertical-align, top);

  &__icon {
    --icon-color: #{functions.var($element + "-icon", color)};

    flex: none;
    margin: functions.var($element + "-icon", margin, 0 var(--space-4) 0 0);

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-icon", margin, 0 0 0 var(--space-4));
    }
  }

  &__message {
    --text-color: #{functions.var($element, color, var(--color-text-body))};
  }

  @each $type in $types {
    &--#{$type} {
      #{$this}__icon {
        --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-#{$type}))};
      }

      #{$this}__message {
        --text-color: #{functions.var($element, color, var(--color-text-#{$type}))};
      }
    }
  }
}
</style>
