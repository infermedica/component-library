import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  UiRange,
  type RangeProps,
  UiNumberStepper,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';
import * as NumberStepperStories from '../../molecules/UiNumberStepper/UiNumberStepper.stories';

type RangeArgsType = RangeProps;
type RangeMetaType = Meta<RangeArgsType>;
type RangeStoryType = StoryObj<RangeArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(deepmerge(UiRange, UiNumberStepper));

const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    ...args,
    ...NumberStepperStories.default.args,
  },
  argTypes: {
    ...argTypes,
    modelValue: 'number',
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies RangeMetaType;
export default meta;

export const Basic: RangeStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{ ...attrs }"/>',
    };
  },
};
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const States: RangeStoryType = { ...Basic };
States.decorators = [
  withVariants,
  withVModel,
];
States.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'active',
      'focus',
    ].map((variant) => ({
      label: `${variant}`,
      inputAttrs: { class: `pseudo-${variant}` },
    })),
    {
      label: 'disabled',
      disabled: true,
      inputAttrs: { class: 'ui-range--is-disabled' },
    },
  ],
};

export const Min: RangeStoryType = { ...Basic };
Min.args = { modelValue: meta.args.min };

export const Max: RangeStoryType = { ...Basic };
Max.args = { modelValue: meta.args.max };

// TODO: Slots docs in Controls -> New component for Controls
