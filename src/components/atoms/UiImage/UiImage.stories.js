import UiImage from '@/components/atoms/UiImage/UiImage.vue';

export default {
  title: 'Atoms/Image',
  component: UiImage,
  args: {
    src: '/assets/illustrations/instruction.svg',
  },
  argTypes: {
    src: {
      control: 'text',
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiImage },
  setup() { return { ...args }; },
  template: '<UiImage :src="src"/>',
});

export const Common = Template.bind({});
