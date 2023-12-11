import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiProgress } from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { withVariants } from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
  EvidenceBarStories,
  EvidenceBarStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiProgress);

const meta = {
  title: 'Atoms/Progress',
  component: UiProgress,
  args: {
    ...args,
    min: 0,
    max: 100,
    value: 20,
  },
  argTypes,
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{...attrs}"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const EvidenceBar: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { EvidenceBarStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<EvidenceBarStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
EvidenceBar.decorators = [ withVariants ];
EvidenceBar.parameters = {
  variants: [
    {
      label: 'week',
      value: 10,
    },
    {
      label: 'strong',
      value: 75,
    },
    {
      label: 'strong',
      value: 93,
    },
  ],
  docs: { source: { code: EvidenceBarStoriesSource } },
};
