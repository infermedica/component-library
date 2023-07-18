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

import {
  BasicStories,
  BasicStoriesSource,
  NoRadiusStories,
  NoRadiusStoriesSource,
  HeightsStories,
  HeightsStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Progress',
  component: UiProgress,
  args: {
    value: 20,
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

export const Basic: ProgressStoryType = { render: () => (BasicStories) };
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const NoRadius: ProgressStoryType = { render: () => (NoRadiusStories) };
NoRadius.parameters = { docs: { source: { code: NoRadiusStoriesSource } } };

export const Heights: ProgressStoryType = { render: () => (HeightsStories) };
Heights.args = { class: 'heights-progress' };
Heights.parameters = { docs: { source: { code: HeightsStoriesSource } } };

export const Min: ProgressStoryType = { ...Basic };
Min.args = { value: 0 };

export const Max: ProgressStoryType = { ...Basic };
Max.args = { value: 100 };
