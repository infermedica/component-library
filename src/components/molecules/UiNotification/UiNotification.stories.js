import UiNotification from '@/components/molecules/UiNotification/UiNotification.vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { content } from '@sb/helpers/argTypes';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onClick: 'action',
});

export default {
  title: 'Molecules/Notification',
  component: UiNotification,
  subcomponents: { UiAlert },
  args: {
    content: 'Thank you. We’ll review this question as soon as possible.',
    type: 'error',
    hasIcon: true,
    translation: {
      action: 'Action',
    },
    buttonActionAttrs: {
      onClick: () => (events.onClick()),
    },
  },
  argTypes: {
    content,
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    }
  },
  parameters: {
    cssprops: {
      'notification-border-radius': {
        value: 'var(--border-radius-container)',
        control: 'text',
        description: '',
      },
      'notification-padding': {
        value: 'var(--space-12)',
        control: 'text',
        description: '',
      },
      'notification-background': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'notification-border': {
        value: 'var(--notification-border-style, solid) var(--notification-border-color, transparent)',
        control: 'text',
        description: '',
      },
      'notification-border-width': {
        value: '1px',
        control: 'text',
        description: '',
      },
      'notification-success-background-color': {
        value: 'var(--color-background-success)',
        control: 'text',
        description: '',
      },
      'notification-info-background-color': {
        value: 'var(--color-background-info)',
        control: 'text',
        description: '',
      },
      'notification-warning-background-color': {
        value: 'var(--color-background-warning)',
        control: 'text',
        description: '',
      },
      'notification-error-background-color': {
        value: 'var(--color-background-error)',
        control: 'text',
        description: '',
      },
    },
  },
  decorators: [() => ({ template: '<div style="max-width: 320px;"><story /></div>' })],
};

const Template = (args) => ({
  components: { UiNotification, UiAlert },
  setup() { return { ...args }; },
  template: `<UiNotification 
    :type="type"
    :has-icon="hasIcon"
    :translation="translation"
    :button-action-attrs="buttonActionAttrs"
  >
    {{ content }}
  </UiNotification>`,
});

export const Error = Template.bind({});
Error.args = {
  type: 'error',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
};

export const WithActionSlot = (args) => ({
  components: { UiNotification, UiButton, UiIcon },
  setup() { return { ...args }; },
  template: `<UiNotification 
    :type="type"
    :has-icon="hasIcon"
    :translation="translation"
    :button-action-attrs="buttonActionAttrs"
  >
    {{ content }}
    <template #action="{attrs, translation, hasAction}">
      <UiButton
        v-if="hasAction"
        v-bind="attrs"
        class="ui-button--text ui-button--has-icon ui-notification__action"
      >
        {{ translation.action }} <UiIcon
          icon="chevron-right"
          class="ui-button__icon ui-button__icon--right"
      />
      </UiButton>
    </template>
  </UiNotification>`,
});
