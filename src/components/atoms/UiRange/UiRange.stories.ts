import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  ref,
  inject,
} from 'vue';
import deepmerge from 'deepmerge';
import {
  UiRange,
  UiHeading,
} from '@/../index';
import {
  withVModel,
  withVariants,
} from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';

const { argTypes } = useArgTypes(deepmerge(
  UiRange,
  inputEvents,
));

import {
  BasicStories,
  BasicStoriesSource,
  WithValueSlotStories,
  WithValueSlotStoriesSource,
  WithRangeSlotStories,
  WithRangeSlotStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Range',
  component: UiRange,
  args: {
    ariaLabel: 'patient age',
    modelValue: 50,
    min: 18,
    max: 122,
    step: 1,
    inputAttrs: { 'data-testid': 'input-element' },
    headingValueAttrs: { 'data-testid': 'value-heading' },
  },
  argTypes: {
    ...argTypes,
    ariaLabel: {
      name: 'aria-label',
      description: 'Use this control to set aria-label attribute.',
      control: 'text',
      table: { category: 'html attributes' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiRange>;
export default meta;
type Story = StoryObj<typeof UiRange>;

export const Basic: Story = { render: () => (BasicStories) };
Basic.decorators = [ withVModel ];
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
};

export const PseudoClass: Story = { ...Basic };
PseudoClass.decorators = [
  withVariants,
  withVModel,
];
PseudoClass.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      inputAttrs: { class: `pseudo-${variant}` },
    })),
  ],
};

export const Min:Story = { ...Basic };
Min.args = { modelValue: meta.args.min };
Min.decorators = [ withVModel ];
Min.parameters = { docs: { source: { code: null } } };

export const Max:Story = { ...Basic };
Max.args = { modelValue: meta.args.max };
Max.decorators = [ withVModel ];
Max.parameters = { ...Min.parameters };

export const WithValueSlot: Story = { render: () => (WithValueSlotStories) };
WithValueSlot.decorators = [ withVModel ];
WithValueSlot.parameters = { docs: { source: { code: WithValueSlotStoriesSource } } };

export const WithRangeSlot: Story = { render: () => (WithRangeSlotStories) };
WithRangeSlot.decorators = [ withVModel ];
WithRangeSlot.parameters = { docs: { source: { code: WithRangeSlotStoriesSource } } };
