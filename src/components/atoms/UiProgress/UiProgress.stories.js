import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';

export default {
  title: 'Atoms/Progress',
  components: { UiProgress },
  args: {
    max: 100,
    value: 32,
  },
  argTypes: {
    value: { control: 'number', table: { category: 'HTML Attributes' } },
    max: { control: 'number', table: { category: 'HTML Attributes' } },
  },
};

const Template = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<UiProgress
    :min="0"
    :max="max"
    :value="value"
  />`,
});

export const Common = Template.bind({});
Common.decorators = [() => ({ template: '<div class="max-w-32"><story /></div>' })];
