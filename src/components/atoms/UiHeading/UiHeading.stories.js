import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import { content } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: {
    content: 'Do you have any of the following symptoms?',
    level: 2,
    tag: '',
  },
  argTypes: {
    content,
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
    },
  },
  parameters: {
    cssprops: {
      'heading-font': {
        value: 'var(--font-body-1)',
        control: 'text',
        description: '',
      },
      'heading-letter-spacing': {
        value: 'var(--letter-spacing-body-1)',
        control: 'text',
        description: '',
      },
      'heading-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'heading-color': {
        value: 'var(--color-text-heading)',
        control: 'text',
        description: '',
      },
      'heading-text-decoration': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'heading-text-transform': {
        value: undefined,
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiHeading },
  setup() { return { ...args }; },
  template: `<UiHeading
    :level="level"
  >
  {{content}}
  </UiHeading>`,
});

export const Common = Template.bind({});

export const AsSpan = Template.bind({});
AsSpan.args = {
  tag: 'span',
};
