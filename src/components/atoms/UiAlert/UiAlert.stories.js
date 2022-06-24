import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { content, modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Alert',
  component: UiAlert,
  subcomponents: { UiIcon, UiText },
  args: {
    content: 'Select one answer',
    modifiers: [],
    type: 'error',
  },
  argTypes: {
    content,
    modifiers: modifiers({ options: ['ui-alert--secondary'], control: 'select' }),
    type: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
    },
  },
  parameters: {
    cssprops: {
      'alert-border-radius': {
        value: '0',
        control: 'text',
        description: '',
      },
      'alert-background': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'alert-border': {
        value: 'var(--alert-border-style, solid) var(--alert-border-color, transparent)',
        control: 'text',
        description: '',
      },
      'alert-border-width': {
        value: '0',
        control: 'text',
        description: '',
      },
      'alert-icon-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'alert-icon-color': {
        value: 'var(--color-icon-error)',
        control: 'text',
        description: '',
      },
      'alert-icon-margin': {
        value: '0 0 0 var(--space-4)',
        control: 'text',
        description: '',
      },
      'alert-message-font': {
        value: 'var(--font-body-2-comfortable)',
        control: 'text',
        description: '',
      },
      'alert-message-letter-spacing': {
        value: 'var(--letter-spacing-body-2-comfortable)',
        control: 'text',
        description: '',
      },
      'alert-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiAlert },
  setup() { return { ...args }; },
  template: `<UiAlert 
    :type="type" 
    :class="modifiers"
  >
    {{ content }}
  </UiAlert>`,
});

export const Error = Template.bind({});
Error.args = {
  type: 'error',
};

export const Default = Template.bind({});
Default.args = {
  type: 'default',
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

export const WithIconSlot = (args) => ({
  components: { UiAlert, UiIcon },
  setup() { return { ...args }; },
  template: `<UiAlert 
    :type="type" 
    :class="modifiers"
  >
    <template #icon>
      <UiIcon 
        icon="error-filled"
        class="ui-alert__icon"
      />
    </template>
    {{ content }}
  </UiAlert>`,
});

export const WithMessageSlot = (args) => ({
  components: { UiAlert, UiText },
  setup() { return { ...args }; },
  template: `<UiAlert 
    :type="type" 
    :class="modifiers"
  >
    <template #message>
      <UiText class="ui-alert__message">
        How to check it?
      </UiText>
    </template>
  </UiAlert>`,
});
