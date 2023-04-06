import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiText } from '@/../index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers'
import { content } from '@sb/helpers/argTypes/index.js'

const { argTypes } = useArgTypes(UiText);


const meta = {
  title: 'Atoms/Text',
  component: UiText,
  args: { content: 'How to use it?' },
  argTypes: {
    ...argTypes,
    content
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [320, 1200],
    },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiText>;
export default meta;
type Story = StoryObj<typeof UiText>;

export const Basic: Story = {
  render: () => ({
    components: { UiText },
    setup( props, { attrs } ) {
      const {
        content,
        modifiers,
        ...args
      } = attrs;
      return {
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiText v-bind="args">
      {{ content }}
    </UiText>`,
  }),
};
Basic.args = { modifiers: [] };
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiText :tag="tag"> {{ content }} </UiText>
</template>
<script setup lang="ts">
import { UiText } from '@infermedica/component-library';

const tag = 'p';
</script>`
    }
  }
}

export const AllVariants: Story = {...Basic };
AllVariants.argTypes = {
  tag: { control: false },
  modifiers: { control: false },
};
AllVariants.decorators = [ withVariants ]
AllVariants.parameters = {
  variants: [
    ...argTypes.modifiers.options.map((variant) => ({
      label: `${variant.replace('ui-text--', '')}`,
      class: `${variant}`,
    })),
  ],
};

export const Secondary: Story = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-secondary"><story/></div>' })
];

export const Brand: Story = { ...AllVariants };
Brand.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-brand"><story/></div>' })
];
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
