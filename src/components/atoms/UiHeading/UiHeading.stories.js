import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';

export default {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: {
    content: 'Do you have any of the following symptoms?',
    level: 2,
    tag: '',
  },
  argTypes: {
    content: { control: 'text' },
    level: { control: { type: 'range', min: 1, max: 6 } },
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
