import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

export default {
  title: 'Molecules/Alert',
  component: UiAlert,
  subcomponents: {
    UiIcon,
    UiText,
  },
  args: {
    content: 'Select one answer',
    modifiers: [],
    type: 'error',
    hasIcon: true,
    iconAlertAttrs: { 'data-testid': 'icon' },
    textMessageAttrs: { 'data-testid': 'text-message' },
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: ['ui-alert', 'ui-alert--secondary'],
      control: 'select',
    }),
    type: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
    },
    iconAlertAttrs: { table: { subcategory: 'Attrs props' } },
    textMessageAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

const Template = (args) => ({
  components: { UiAlert },
  setup() {
    return { ...args };
  },
  template: `<UiAlert 
    :type="type" 
    :has-icon="hasIcon"
    :icon-alert-attrs="iconAlertAttrs"
    :text-message-attrs="textMessageAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiAlert>`,
});

export const Error = Template.bind({});
Error.args = { type: 'error' };

export const Success = Template.bind({});
Success.args = { type: 'success' };

export const Info = Template.bind({});
Info.args = { type: 'info' };

export const Warning = Template.bind({});
Warning.args = { type: 'warning' };

export const WithIconSlot = (args) => ({
  components: {
    UiAlert,
    UiIcon,
  },
  setup() {
    return { ...args };
  },
  template: `<UiAlert
    :type="type"
    :has-icon="hasIcon"
    :icon-alert-attrs="iconAlertAttrs"
    :text-message-attrs="textMessageAttrs"
    :class="modifiers"
  >
    <template #icon="{ 
      iconAlertAttrs
    }">
      <UiIcon 
        v-if="iconAlertAttrs.icon"
        v-bind="iconAlertAttrs"
        class="ui-alert__icon"
      />
    </template>
    {{ content }}
  </UiAlert>`,
});

export const WithMessageSlot = (args) => ({
  components: {
    UiAlert,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiAlert
      :type="type"
      :has-icon="hasIcon"
      :icon-alert-attrs="iconAlertAttrs"
      :text-message-attrs="textMessageAttrs"
      :class="modifiers"
  >
    <template #message="{
      textMessageAttrs
    }">
      <UiText
        v-bind="textMessageAttrs"
        class="ui-text--body-2-comfortable ui-alert__message"
      >
        How to check it?
      </UiText>
    </template>
  </UiAlert>`,
});
