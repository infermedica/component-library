import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiProgress } from '@index';
import type { ProgressProps } from '@index';
import './UiProgress.stories.scss';
import { useArgTypes } from '@sb/helpers';

type ProgressArgsType = ProgressProps & {
  class?: string;
}
type ProgressMetaType = Meta<ProgressArgsType>;
type ProgressStoryType = StoryObj<ProgressArgsType>;

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
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies ProgressMetaType;
export default meta;

export const Basic: ProgressStoryType = {
  render: () => ({
    components: { UiProgress },
    template: '<UiProgress v-bind="$attrs"/>',
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
</script>`,
    },
  },
};

export const NoRadiusProgress: ProgressStoryType = { ...Basic };
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
</style>`,
    },
  },
};

export const HeightsProgress: ProgressStoryType = { ...Basic };
HeightsProgress.args = { class: 'heights-progress' };
HeightsProgress.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiProgress
      :value="value"
      :min="min"
      :max="max"
      class="heights-progress"
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
</style>`,
    },
  },
};
