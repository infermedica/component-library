import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

export default {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  parameters: {
    cssprops: {
      'backdrop-position': {
        value: 'fixed',
        control: 'text',
        description: '',
      },
      'backdrop-background': {
        value: 'var(--color-backdrop)',
        control: 'text',
        description: '',
      },
      'backdrop-opacity': {
        value: 'var(--opacity-medium)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiBackdrop },
  setup() { return { args }; },
  template: '<UiBackdrop style="position: absolute"/>',
});

export const Common = Template.bind({});
Common.parameters = {
  controls: { hideNoControlsWarning: true },
};
Common.decorators = [() => ({ template: '<div style="min-height: 320px"><story /></div>' })];
