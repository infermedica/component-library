import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

export default {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  decorators: [
    () => ({
      template: `<div class="min-h-80">
      <story />
    </div>`,
    }),
  ],
  parameters: {
    controls: { hideNoControlsWarning: true },
    cssProperties: {
      '--backdrop-background': 'var(--color-backdrop)',
      '--backdrop-opacity': 'var(--opacity-medium)',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiBackdrop },
    setup() {
      return { args };
    },
    template: '<UiBackdrop class="absolute"/>',
  }),
};
