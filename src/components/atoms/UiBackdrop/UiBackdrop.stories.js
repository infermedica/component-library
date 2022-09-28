import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

export default {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
};

const Template = (args) => ({
  components: { UiBackdrop },
  setup() {
    return { args };
  },
  template: '<UiBackdrop style="position: absolute"/>',
});

export const Common = Template.bind({});
Common.parameters = { controls: { hideNoControlsWarning: true } };
Common.decorators = [() => ({ template: '<div style="min-height: 320px"><story /></div>' })];
