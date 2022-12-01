import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

export default {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  decorators: [ () => ({
    template: `<div class="min-h-80">
      <story />
    </div>`,
  }) ],
  parameters: { controls: { hideNoControlsWarning: true } },
};

export const Common = (args) => ({
  components: { UiBackdrop },
  setup() {
    return { args };
  },
  template: '<UiBackdrop class="absolute"/>',
});
