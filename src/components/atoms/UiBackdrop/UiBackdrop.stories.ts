import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiBackdrop } from '@/../index';

const meta = {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  decorators: [ () => ({ template: '<div class="min-h-80"><story/></div>' }) ],
  parameters: {
    chromatic: { disableSnapshot: false },
  }
} satisfies Meta<typeof UiBackdrop>;
export default meta;
type Story = StoryObj<typeof UiBackdrop>;
export const Basic: Story = {
  render: () => ({
    components: { UiBackdrop },
    template: '  <UiBackdrop />',
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
${Basic.render().template}
</template>

<script lang="ts">
import { UiBackdrop } from '@infermedica/component-library'
</script>`,
    },
  },
};
