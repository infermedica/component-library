import UiNotification from '@/components/molecules/UiNotification/UiNotification.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import { actions } from '@storybook/addon-actions';
import { content } from '@sb/helpers/argTypes';
const events = actions({
  onClick: 'action',
});
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
    translation: {
      action: 'Action',
    },
    buttonActionAttrs: {
      onClick: () => events.onClick(),
    },
    iconActionAttrs: {
      'data-test': 'action-icon',
    },
  },
  argTypes: {
    content,
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    buttonActionAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
    },
    iconActionAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
    },
  },
  decorators: [
    () => ({
      template: `<div class="max-w-80">
      <story />
    </div>`,
    }),
  ],
};
export const Error = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return {
        ...args,
      };
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
  args: {
    type: 'error',
  },
};
export const Success = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return {
        ...args,
      };
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
  args: {
    type: 'success',
  },
};
export const Info = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return {
        ...args,
      };
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
  args: {
    type: 'info',
  },
};
export const Warning = {
  render: (args) => ({
    components: {
      UiNotification,
      UiAlert,
    },
    setup() {
      return {
        ...args,
      };
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
  args: {
    type: 'warning',
  },
};
export const WithActionSlot = {
  render: (args) => ({
    components: {
      UiNotification,
      UiButton,
      UiIcon,
    },
    setup() {
      return {
        ...args,
      };
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
};
