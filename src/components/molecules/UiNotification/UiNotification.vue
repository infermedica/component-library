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
    <template
      #message="{ textMessageAttrs }"
    >
      <!-- @slot Use this slot to replace message template. -->
      <slot
        name="message"
        v-bind="{ textMessageAttrs }"
      >
        <div class="ui-notification__message">
          <!-- @slot Use this slot to replace text template. -->
          <slot
            name="text"
            v-bind="{ textMessageAttrs }"
          >
            <UiText
              v-bind="{ textMessageAttrs }"
              class="ui-notification__text"
            >
              <!-- @slot Use this slot to place text inside alert. -->
              <slot />
            </UiText>
          </slot>
          <!-- @slot Use this slot to replace action template.-->
          <slot
            name="action"
            v-bind="{
              buttonActionAttrs,
              translation: defaultProps.translation,
              hasAction,
              iconActionAttrs: defaultProps.iconActionAttrs,
            }"
          >
            <UiButton
              v-if="hasAction"
              v-bind="buttonActionAttrs"
              class="ui-button--text ui-button--has-icon ui-notification__action"
            >
              {{ defaultProps.translation?.action }}
              <UiIcon
                v-bind="defaultProps.iconActionAttrs"
                icon="chevron-right"
                class="ui-button__icon"
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
import UiAlert from '../UiAlert/UiAlert.vue';
import type { AlertAttrsProps } from '../UiAlert/UiAlert.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../types';

export interface NotificationTranslation {
  action: string;
}
export interface NotificationProps {
  /**
   * Use this props to set notification type.
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /**
   * Use this props to hide icon.
   */
  hasIcon?: boolean;
  /**
   * Use this props to pass labels inside component translation.
   */
  translation?: NotificationTranslation;
  /**
   * Use this props to pass attrs for action UiButton.
   */
  buttonActionAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for action UiIcon.
   */
  iconActionAttrs?: IconAttrsProps;
}
export type NotificationAttrsProps = DefineAttrsProps<NotificationProps, AlertAttrsProps>

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'error',
  hasIcon: true,
  translation: () => ({ action: 'Action' }),
  buttonActionAttrs: () => ({}),
  iconActionAttrs: () => ({ icon: 'chevron-right' }),
});
const defaultProps = computed<NotificationProps>(() => ({
  translation: { ...props.translation },
  iconActionAttrs: {
    icon: 'chevron-right',
    ...props.iconActionAttrs,
  },
}));
const modifier = computed(() => `ui-notification--${props.type}`);
const hasAction = computed(() => (Object.keys(props.buttonActionAttrs).length > 0));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-notification {
  $element: notification;
  $types: "success", "info", "warning", "error";

  --alert-gap: #{functions.var($element, gap, var(--space-12))};

  @include mixins.use-logical($element, padding, var(--space-12));
  @include mixins.inner-border(
    $element,
    $radius: var(--border-radius-container),
    $color: var(--color-border-strong)
  );

  display: flex;
  background: functions.var($element, background);

  &__action {
    @include mixins.use-logical($element + "-action", margin, var(--space-4) 0 0);
  }

  @each $type in $types {
    &--#{$type} {
      background: functions.var($element, background, var(--color-background-#{$type}));

      &::after {
        @include mixins.use-logical($element, border-color, var(--color-border-#{$type}-subtle));
      }
    }
  }
}
</style>
