import UiText from '@/components/atoms/UiText/UiText.vue';
import { content, modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Text',
  component: UiText,
  args: {
    content: 'It looks like you are using an outdated browser that is having trouble viewing modern web pages. To proceed, download and install the latest version of your favorite browser:',
    modifiers: [],
    tag: 'p',
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: ['1-thick', '2-comfortable', '2-compact', '2-comfortable-thick', '2-compact-thick', 'caption']
        .map((modifier) => (`ui-text--${modifier}`)),
    }),
  },
  parameters: {
    cssprops: {
      'text-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'text-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiText },
  setup() { return { ...args }; },
  template: `<UiText 
    :tag="tag" 
    :class="modifiers"
  >
    {{content}}  
  </UiText>`,
});

export const TextBody1 = Template.bind({});

export const TextBody1Thick = Template.bind({});
TextBody1Thick.args = {
  modifiers: 'ui-text--1-thick',
};

export const TextBody2Comfortable = Template.bind({});
TextBody2Comfortable.args = {
  modifiers: 'ui-text--2-comfortable',
};

export const TextBody2Compact = Template.bind({});
TextBody2Compact.args = {
  modifiers: 'ui-text--2-compact',
};

export const TextBody2ComfortableThick = Template.bind({});
TextBody2ComfortableThick.args = {
  modifiers: 'ui-text--2-comfortable-thick',
};

export const TextBody2CompactThick = Template.bind({});
TextBody2CompactThick.args = {
  modifiers: 'ui-text--2-compact-thick',
};

export const TextCaption = Template.bind({});
TextCaption.args = {
  modifiers: 'ui-text--caption',
};
