<template>
  <div
    class="ui-alert"
    :class="rootClassModifier"
    v-bind="alertAttrs"
  >
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{ iconAlertAttrs: defaultProps.iconAlertAttrs }"
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
      v-bind="{ textMessageAttrs }"
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
import {
  computed,
  type HTMLAttributes,
} from 'vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  IconName,
} from '../../../types';

export interface AlertProps {
  /**
   * Use this props to set alert type.
   */
  type?: 'success' | 'info' | 'warning' | 'error' | 'default';
  /**
   * Use this props to hide icon.
   */
  hasIcon?: boolean;
  /**
   * Use this props to pass attrs for UiIcon
   */
  iconAlertAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for message UiText
   */
  textMessageAttrs?: TextAttrsProps;
}
export type AlertAttrsProps = DefineAttrsProps<AlertProps>;
const props = withDefaults(defineProps<AlertProps>(), {
  type: 'error',
  hasIcon: true,
  iconAlertAttrs: () => ({}),
  textMessageAttrs: () => ({}),
});
const rootClassModifier = computed(() => `ui-alert--${props.type}`);
const icon = computed<IconName>(() => ((!props.hasIcon || props.type === 'default') ? '' : `${props.type}-filled`));
const defaultProps = computed(() => ({
  iconAlertAttrs: {
    icon: icon.value,
    ...props.iconAlertAttrs,
  },
}));
const alertAttrs = computed<HTMLAttributes>(() => ((props.type !== 'error') ? ({}) : ({
  role: 'alert',
  'aria-live': 'polite',
})));
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
  gap: functions.var($element, gap, var(--space-4));
  vertical-align: functions.var($element, vertical-align, top);

  &__icon {
    --icon-color: #{functions.var($element + "-icon", color)};

    flex: none;
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
