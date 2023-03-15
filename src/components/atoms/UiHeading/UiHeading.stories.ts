import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiHeading } from '@/../index';
import { components } from '@storybook/components';

const meta = {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: { level: 2 },
  argTypes: {
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
    },
  },
} satisfies Meta<typeof UiHeading>;
export default meta;
type Story = StoryObj<typeof UiHeading>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiHeading },
    setup() {
      return { args };
    },
    template: `<UiHeading v-bind="args">
        Do you have any of the following symptoms?
    </UiHeading>`,
  }),
};
Basic.args = { level: 2 };

export const WithCustomTag: Story = { ...Basic };
WithCustomTag.args = { tag: 'span' };

export const AllVariants: Story = {
  render: (args) => ({
    components: { UiHeading },
    template: `<template v-for="level in 5">
      <UiHeading :level="level">
        Do you have any of the following symptoms?
      </UiHeading>
    </template>`,
  }),
};

export const Secondary: Story = { ...AllVariants };
Secondary.decorators = [ () => ({ template: '<div class="ui-heading--theme-secondary"><story/></div>' }) ];

export const OnBrand: Story = { ...AllVariants };
OnBrand.parameters = { backgrounds: { default: 'brand' } };
OnBrand.decorators = [ () => ({ template: '<div class="ui-heading--theme-brand"><story/></div>' }) ];

