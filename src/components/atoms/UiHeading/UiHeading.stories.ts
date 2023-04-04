import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiHeading } from '@/../index';
import raw from './UiHeading.vue?raw';
import { withVariants } from '@sb/decorators';
import {
  parseArgTypes,
  parseRaw,
} from '@sb/helpers'
import { content } from '@sb/helpers/argTypes/index.js';
const argTypes = parseArgTypes(UiHeading);
const { variables: UiHeadingVariables } = parseRaw(raw);

const meta = {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: { content: 'How to use it?' },
  argTypes: {
    ...argTypes,
    content,
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
      },
    },
    ...UiHeadingVariables
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [320, 1200],
    },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiHeading>;
export default meta;
type Story = StoryObj<typeof UiHeading>;

export const Basic: Story = {
  render: () => ({
    components: { UiHeading },
    setup(props, { attrs }) {
      const {
        content, ...args
      } = attrs;
      return {
        content,
        args,
      };
    },
    template: `<UiHeading v-bind="args">
      {{ content }}
    </UiHeading>`,
  }),
};
Basic.args = { level: 2 };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiHeading 
    :level="level"
  >
    {{ content }}
  </UiHeading>
</template>

<script setup lang="ts">
import { UiHeading } from '@infemedica/component-library'

const level = 2;
</script>`
    }
  }
}

export const AllVariants: Story = {
  ...Basic,
};
AllVariants.argTypes = {
  level: { control: false },
  tag: { control: false },
};
AllVariants.decorators = [ withVariants ];
AllVariants.parameters = {
  variants: [
    ...Array.apply(null, Array(5)).map( (variant, index)=> ({
      label: `H${index+1}`,
      level: index+1,
    }))
  ],
};

export const Secondary: Story = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-heading--theme-secondary"><story/></div>' })
];

export const Brand: Story = { ...AllVariants };
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-heading--theme-brand"><story/></div>' })
];

