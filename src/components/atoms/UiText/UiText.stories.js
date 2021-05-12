import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Atoms/Text',
  components: { UiText },
  args: {
    content: 'It looks like you are using an outdated browser that is having trouble viewing modern web pages. To proceed, download and install the latest version of your favorite browser:',
    tag: 'p',
  },
  argTypes: {
    content: { control: 'text' },
    tag: { control: 'text', table: { category: 'HTML Attributes' } },
    modifiers: {
      control: { type: 'select', options: ['1-thick', '2-comfortable', '2-compact', '2-comfortable-thick', '2-compact-thick'].map((modifier) => (`ui-text--${modifier}`)) },
      table: {
        category: 'HTML attributes',
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
