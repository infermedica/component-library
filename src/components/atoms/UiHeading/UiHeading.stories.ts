import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiHeading } from '@/../index';
import {withVariants } from '@sb/decorators';

const meta = {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: { content: 'How to use it?' },
  argTypes: {
    content: {
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
    },
    tag: { control: { type: 'text' } },
    default: { control: false },
  },
} satisfies Meta<typeof UiHeading>;
export default meta;
type Story = StoryObj<typeof UiHeading>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiHeading },
    setup() {
      const {
        content, ...rest
      } = args;
      return {
        content,
        rest,
      };
    },
    template: `<UiHeading v-bind="rest">
      {{ content }}
    </UiHeading>`,
  }),
};
Basic.args = { level: 2 };

export const WithLevel: Story = { ...Basic };
WithLevel.args = { level: 2 };
WithLevel.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiHeading level="1">
    {{ content }}
  </UiHeading>
</template>

<script setup lang="ts">
import { UiHeading } from '@infermedica/component-library';
</script>`,
    },
  },
};

export const WithTag: Story = { ...Basic };
WithTag.args = { tag: 'span' };
WithTag.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiHeading tag="span">
    {{ content }}
  </UiHeading>
</template>

<script setup lang="ts">
import { UiHeading } from '@infermedica/component-library';
</script>`,
    },
  },
};

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
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
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

