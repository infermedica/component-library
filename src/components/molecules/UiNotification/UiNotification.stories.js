import UiNotification from '@/components/molecules/UiNotification/UiNotification.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';
import { WithIconInNavigationItemSlot } from '@/components/molecules/UiNavigation/UiNavigation.stories';

const events = actions({ onClick: 'action' });

export default {
  title: 'Molecules/Notification',
  component: UiNotification,
  subcomponents: {
    UiAlert,
    UiButton,
    UiIcon,
  },
  args: {
    content: 'Thank you. We’ll review this question as soon as possible.',
    type: 'error',
    hasIcon: true,
    translation: { action: 'Action' },
    buttonActionAttrs: { onClick: () => events.onClick() },
    iconActionAttrs: { 'data-test': 'action-icon' },
  },
  argTypes: {
    content,
    type: {
      control: 'select',
      options: [
        'success',
        'info',
        'warning',
        'error',
      ],
    },
    buttonActionAttrs: { table: { subcategory: 'Attrs props' } },
    iconActionAttrs: { table: { subcategory: 'Attrs props' } },
  },
  decorators: [ () => ({
    template: `<div class="max-w-80">
      <story />
    </div>`,
  }) ],
  parameters: {
    cssProperties: {
      '--notification-gap': 'var(--space-12)',
      '--notification-padding-block':
        'var(--notification-padding-block-start, var(--space-12)) var(--notification-padding-block-end, var(--space-12))',
      '--notification-padding-inline':
        'var(--notification-padding-inline-start, var(--space-12)) var(--notification-padding-inline-end, var(--space-12))',
      '--notification-border-start-start-radius': 'var(--border-radius-container)',
      '--notification-border-start-end-radius': 'var(--border-radius-container)',
      '--notification-border-end-start-radius': 'var(--border-radius-container)',
      '--notification-border-end-end-radius': 'var(--border-radius-container)',
      '--notification-transition': 'border-color 150ms ease-in-out',
      '--notification-background': 'var(--color-background-error)',
      '--notification-border-block':
        'var(--notification-border-block-start, var(--notification-border)) var(--notification-border-block-end, var(--notification-border))',
      '--notification-border-inline':
        'var(--notification-border-inline-start, var(--notification-border)) var(--notification-border-inline-end, var(--notification-border))',
      '--notification-border-block-style':
        'var(--notification-border-block-start-style, solid) var(--notification-border-block-end-style, solid)',
      '--notification-border-inline-style':
        'var(--notification-border-inline-start-style, solid) var(--notification-border-inline-end-style, solid)',
      '--notification-border-block-color':
        'var(--notification-border-block-start-color, var(--color-border-error-subtle)) var(--notification-border-block-end-color, var(--color-border-error-subtle))',
      '--notification-border-inline-color':
        'var(--notification-border-inline-start-color, var(--color-border-error-subtle)) var(--notification-border-inline-end-color, var(--color-border-error-subtle))',
      '--notification-border-block-width':
        'var(--notification-border-block-start-width, 1px) var(--notification-border-block-end-width, 1px)',
      '--notification-border-inline-width':
        'var(--notification-border-inline-start-width, 1px) var(--notification-border-inline-end-width, 1px)',
      '--notification-action-margin-block':
        'var(--notification-action-margin-block-start, var(--space-4)) var(--notification-action-margin-block-end, 0)',
      '--notification-action-margin-inline':
        'var(--notification-action-margin-inline-start, 0) var(--notification-action-margin-inline-end, 0)',
    },
  },
};

export const Error = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNotification
      :type="type"
      :has-icon="hasIcon"
      :translation="translation"
      :button-action-attrs="buttonActionAttrs"
      :icon-action-attrs="iconActionAttrs"
      :icon-alert-attrs="{ 'data-test': 'alert-icon' }"
      :text-message-attrs="{ 'data-testid': 'message-text' }"
    >
      {{ content }}
    </UiNotification>`,
  }),

  args: { type: 'error' },
};

export const Success = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNotification
      :type="type"
      :has-icon="hasIcon"
      :translation="translation"
      :button-action-attrs="buttonActionAttrs"
      :icon-action-attrs="iconActionAttrs"
      :icon-alert-attrs="{ 'data-test': 'alert-icon' }"
      :text-message-attrs="{ 'data-testid': 'message-text' }"
    >
      {{ content }}
    </UiNotification>`,
  }),

  args: { type: 'success' },
};

export const Info = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNotification
      :type="type"
      :has-icon="hasIcon"
      :translation="translation"
      :button-action-attrs="buttonActionAttrs"
      :icon-action-attrs="iconActionAttrs"
      :icon-alert-attrs="{ 'data-test': 'alert-icon' }"
      :text-message-attrs="{ 'data-testid': 'message-text' }"
    >
      {{ content }}
    </UiNotification>`,
  }),

  args: { type: 'info' },
};

export const Warning = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNotification
      :type="type"
      :has-icon="hasIcon"
      :translation="translation"
      :button-action-attrs="buttonActionAttrs"
      :icon-action-attrs="iconActionAttrs"
      :icon-alert-attrs="{ 'data-test': 'alert-icon' }"
      :text-message-attrs="{ 'data-testid': 'message-text' }"
    >
      {{ content }}
    </UiNotification>`,
  }),

  args: { type: 'warning' },
};

export const WithActionSlot = {
  render: (args) => ({
    components: {
      UiNotification,
      UiButton,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNotification
      :type="type"
      :has-icon="hasIcon"
      :translation="translation"
      :button-action-attrs="buttonActionAttrs"
      :icon-alert-attrs="{ 'data-test': 'alert-icon' }"
      :text-message-attrs="{ 'data-testid': 'message-text' }"
    >
      <template #action="{
        buttonActionAttrs,
        translation,
        hasAction,
        iconActionAttrs,
      }">
        <UiButton
          v-if="hasAction"
          v-bind="buttonActionAttrs"
          class="ui-button--text ui-button--has-icon ui-notification__action"
        >
          {{ translation.action }}<UiIcon
            v-bind="iconActionAttrs"
            class="ui-button__icon ui-button__icon--end"
        />
        </UiButton>
      </template>
      {{ content }}
    </UiNotification>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};
