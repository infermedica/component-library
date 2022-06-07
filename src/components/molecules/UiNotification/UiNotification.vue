<template>
  <div
    class="ui-notification"
    :class="modifier"
  >
    <UiAlert
      :type="type"
      :has-icon="hasIcon"
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
              <UiText class="ui-text--body-2-comfortable ui-notification__text">
                <!-- @slot Use this slot to place text inside alert. -->
                <slot />
              </UiText>
            </slot>
            <!-- @slot Use this slot to replace action template.-->
            <slot
              name="action"
              v-bind="{attrs: buttonActionAttrs, translation, hasAction}"
            >
              <UiButton
                v-if="hasAction"
                v-bind="buttonActionAttrs"
                class="ui-button--text ui-button--has-icon ui-notification__action"
              >
                {{ translation.action }}
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
   * Use this props to set notification type.
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
  /**
   * Use this props to pass attrs for action UiButton.
   */
  buttonActionAttrs: {
    type: Object,
    default: () => ({}),
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
const modifier = computed(() => `ui-notification--${props.type}`);
const hasAction = computed(() => (Object.keys(props.buttonActionAttrs).length > 0));
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

  &__message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__action {
    margin: var(--space-4) 0 0 0;
  }
}
</style>
