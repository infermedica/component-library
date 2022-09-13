<template>
  <UiAlert
    :type="type"
    :has-icon="hasIcon"
    :class="modifier"
    class="ui-notification"
  >
    <template #icon>
      <!-- @slot Use this slot to replace icon template. -->
      <slot name="icon" />
    </template>
    <template #message>
      <!-- @slot Use this slot to replace message template. -->
      <slot name="message">
        <div class="notification__message">
          <!-- @slot Use this slot to replace text template. -->
          <slot name="text">
            <UiText class="ui-notification__text">
              <!-- @slot Use this slot to place text inside alert. -->
              <slot />
            </UiText>
          </slot>
          <!-- @slot Use this slot to replace action template.-->
          <slot
            name="action"
            v-bind="{
              attrs: buttonActionAttrs,
              translation: defaultProps.translation,
              hasAction
            }"
          >
            <UiButton
              v-if="hasAction"
              v-bind="buttonActionAttrs"
              class="ui-button--text ui-button--has-icon ui-notification__action"
            >
              {{ defaultProps.translation.action }}
              <UiIcon
                icon="chevron-right"
                class="ui-button__icon ui-button__icon--right"
              />
            </UiButton>
          </slot>
        </div>
      </slot>
    </template>
  </UiAlert>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiAlert from '../UiAlert/UiAlert.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
const props = defineProps({
  /**
   * Use this props to set notification type.
   */
  type: {
    type: String as PropType<NotificationType>,
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
   * Use this props to pass attrs for action UiButton.
   */
  buttonActionAttrs: {
    type: Object,
    default: () => ({
    }),
  },
  /**
   * Use this props to pass labels inside component translation.
   */
  translation: {
    type: Object,
    default: () => ({
      action: 'Action',
    }),
  },
});
const defaultProps = computed(() => ({
  translation: {
    action: 'Action',
    ...props.translation,
  },
}));
const modifier = computed<`ui-notification--${NotificationType}`>(() => `ui-notification--${props.type}`);
const hasAction = computed(() => (Object.keys(props.buttonActionAttrs).length > 0));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-notification {
  $element: notification;
  $types: "success", "info", "warning", "error";

  @include mixins.inner-border($element, $radius: var(--border-radius-container), $color: var(--color-border-strong));

  --alert-icon-margin: #{functions.var($element + "-icon", margin, 0 var(--space-12) 0 0)};
  --alert-rtl-icon-margin: #{functions.var($element + "-rtl-icon", margin, 0 0 0 var(--space-12))};

  display: flex;
  padding: functions.var($element, padding, var(--space-12));
  background: functions.var($element, background);

  &__action {
    margin: functions.var($element + "-action", margin, var(--space-4) 0 0 0);
  }

  @each $type in $types {
    &--#{$type} {
      background: functions.var($element, background, var(--color-background-#{$type}));

      &::after {
        border-color: functions.var($element, border-color, var(--color-border-#{$type}-subtle));
      }
    }
  }
}
</style>
