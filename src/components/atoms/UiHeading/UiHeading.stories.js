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
    modifiers: {
      control: { type: 'multi-select', options: [...Array(6)].map((_, index) => (`h${index + 1}`)) },
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiHeading },
  setup() { return { ...args }; },
  template: `<UiHeading
    :level="level"
    :class="modifiers"
  >
  {{content}}
  </UiHeading>`,
});

export const Common = Template.bind({});

export const AsSpan = Template.bind({});
AsSpan.args = {
  tag: 'span',
};
