import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {UiProgress} from '@/../index';
import './UiProgress.stories.scss';

const meta = {
  title: 'Atoms/Progress',
  component: UiProgress,
  args: {
    value: 4,
    min: 0,
    max: 100,
  },
  argTypes: {
  },
} satisfies Meta<typeof UiProgress>;
export default meta;
type Story = StoryObj<typeof UiProgress>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiProgress },
    props: Object.keys(args),
    template: '<UiProgress v-bind="$props"/>',
  }),
};
export const NoRadius: Story = {
  ...Basic,
}
NoRadius.args = {
  class: 'progress-no-radius',
}
NoRadius.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress class="progress-no-radius" />
</template>

<script setup lang="ts">
  import { UiProgress } from '@infermedica/component-library';
</script>

<style lang="scss">
.progress-no-radius {
  --progress-border-start-start-radius: 0;
  --progress-border-start-end-radius: 0;
  --progress-border-end-start-radius: 0;
  --progress-border-end-end-radius: 0;
  --progress-indicator-border-start-end-radius: 0;
  --progress-indicator-border-end-end-radius: 0;
}
</style>`
    }
  }
}

export const Height: Story = {
  ...Basic,
}
Height.args = {
  class: 'progress-height',
}
Height.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress class="progress-height" />
</template>

<script setup lang="ts">
  import { UiProgress } from '@infermedica/component-library';
</script>

<style lang="scss">
.progress-height {
  --progress-height: 3rem;
}
</style>`
    }
  }
}
