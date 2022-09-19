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
      onClick: () => (events.onClick()),
    },
    iconActionAttrs: {
      'data-test': 'icon-action',
    },
    iconAttrs: {
      'data-testid': 'icon',
    },
    textMessageAttrs: {
      'data-testid': 'message',
    },
  },
  argTypes: {
    content,
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    iconAttrs: {
      description: 'Use this props to pass attrs for UiIcon',
      table: {
        category: 'props',
        subcategory: 'UiAlert',
        type: {
          summary: 'object',
        },
      },
      control: 'object',
    },
    textMessageAttrs: {
      description: 'Use this props to pass attrs for message UiText',
      table: {
        category: 'props',
        subcategory: 'UiAlert',
        type: {
          summary: 'object',
        },
      },
      control: 'object',
    },
  },
  decorators: [() => ({
    template: '<div style="max-width: 320px;"><story /></div>',
  })],
};

const Template = (args) => ({
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
    :icon-attrs="iconAttrs"
    :text-message-attrs="textMessageAttrs"
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
    :icon-attrs="iconAttrs"
    :text-message-attrs="textMessageAttrs"
  >
    {{ content }}
    <template #action="{
      attrs, 
      translation, 
      hasAction,
      iconActionAttrs,
    }">
      <UiButton
        v-if="hasAction"
        v-bind="attrs"
        class="ui-button--text ui-button--has-icon ui-notification__action"
      >
        {{ translation.action }} <UiIcon
          v-bind="iconActionAttrs"
          class="ui-button__icon ui-button__icon--right"
      />
      </UiButton>
    </template>
  </UiNotification>`,
});
