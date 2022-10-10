import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

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
      options: [
        ...[
          'body-1-thick',
          'body-2-comfortable',
          'body-2-compact',
          'body-2-comfortable-thick',
          'body-2-compact-thick',
          'caption',
          'button-1',
        ]
          .map((modifier) => (`ui-text--${modifier}`)),
        'ui-text--theme-secondary',
        'ui-text--theme-brand',
      ],
    }),
  },
};

const Template = (args) => ({
  components: { UiText },
  setup() {
    return { ...args };
  },
  template: `<UiText 
    :tag="tag" 
    :class="modifiers"
  >
    {{content}}  
  </UiText>`,
});

export const TextBody1 = Template.bind({});

export const TextBody1Thick = Template.bind({});
TextBody1Thick.args = { modifiers: 'ui-text--body-1-thick' };

export const TextBody2Comfortable = Template.bind({});
TextBody2Comfortable.args = { modifiers: 'ui-text--body-2-comfortable' };

export const TextBody2Compact = Template.bind({});
TextBody2Compact.args = { modifiers: 'ui-text--body-2-compact' };

export const TextBody2ComfortableThick = Template.bind({});
TextBody2ComfortableThick.args = { modifiers: 'ui-text--body-2-comfortable-thick' };

export const TextBody2CompactThick = Template.bind({});
TextBody2CompactThick.args = { modifiers: 'ui-text--body-2-compact-thick' };

export const TextCaption = Template.bind({});
TextCaption.args = { modifiers: 'ui-text--caption' };

export const TextButton1 = Template.bind({});
TextButton1.args = { modifiers: 'ui-text--button-1' };
