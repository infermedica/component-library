import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiProgress } from '@/../index';
import './UiProgress.stories.scss';
import { useArgTypes } from '@sb/helpers'

const { argTypes } = useArgTypes(UiProgress);

const meta = {
  title: 'Atoms/Progress',
  component: UiProgress,
  args: {
    value: 4,
    min: 0,
    max: 100,
  },
  argTypes: {
    ...argTypes,
    value: {
      control: 'range',
      min: 0,
      max: 100,
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  }
} satisfies Meta<typeof UiProgress>;
export default meta;
type Story = StoryObj<typeof UiProgress>;

export const Basic: Story = {
  render: () => ({
    components: { UiProgress },
    setup( props, { attrs } ) {
      return {
        args: attrs,
      }
    },
    template: '<UiProgress v-bind="args"/>',
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress
      :value="value"
      :min="min"
      :max="max" 
    />
</template>

<script setup lang="ts">
import { UiProgress } from '@infermedica/component-library';
  
const min = 0;
const max = 100;
const value = 4;
</script>`
    }
  }
}

export const NoRadiusProgress: Story = {
  ...Basic,
}
NoRadiusProgress.args = {
  class: 'no-radius-progress',
}
NoRadiusProgress.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress
      :value="value"
      :min="min"
      :max="max" 
      class="no-radius-progress"
    />
</template>

<script setup lang="ts">
import { UiProgress } from '@infermedica/component-library';

const min = 0;
const max = 100;
const value = 4;
</script>

<style lang="scss">
@use "@infermedica/component-library/mixins";

.no-radius-progress {
  @include mixins.override-logical('progress', null, border-radius, 0);
  @include mixins.override-logical('progress-indicator', null, border-radius, 0);
}
</style>`
    }
  }
}

export const HeightsProgress: Story = {
  ...Basic,
}
HeightsProgress.args = {
  class: 'heights-progress',
}
HeightsProgress.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress
      :value="value"
      :min="min"
      :max="max" 
      class="no-radius-progress"
    />
</template>

<script setup lang="ts">
import { UiProgress } from '@infermedica/component-library';

const min = 0;
const max = 100;
const value = 4;
</script>

<style lang="scss">
.heights-progress {
  --progress-height: 3rem;
}
</style>`
    }
  }
}
