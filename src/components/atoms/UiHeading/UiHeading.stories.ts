import type {
  Meta,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';
import {
  UiHeading,
  type HeadingProps,
} from '@/../index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import { content as contentArgType } from '@sb/helpers/argTypes/index';
import type { PlayFunctionContext } from '@storybook/types';
import {
  getCSSValue,
  getStyleTests,
} from '@tests/interactions/helpers';

type HeadingArgsType = HeadingProps & {
  content?: string;
}
type HeadingMetaType = Meta<HeadingArgsType>;
type HeadingStoryType = StoryObj<HeadingArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, HeadingArgsType>;

const getVariantTests = async (step: PlayContext['step'], variant = '-heading') => {
  const headings = [ ...document.querySelectorAll('.ui-heading') ];
  await step('Correct font colors', () => {
    getStyleTests(
      headings,
      'color',
      Array(headings.length).fill({ color: getCSSValue(`--color-text${variant}`) }),
    );
  });
};

const { argTypes } = useArgTypes(UiHeading);
const meta = {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: { content: 'How to use it?' },
  argTypes: {
    ...argTypes,
    contentArgType,
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
      },
    },
    modifiers: { table: { disable: true } },
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
} satisfies HeadingMetaType;
export default meta;

export const Basic: HeadingStoryType = {
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
import { UiHeading } from '@infermedica/component-library'

const level = 2;
</script>`,
    },
  },
};

export const AllVariants: HeadingStoryType = { ...Basic };
AllVariants.argTypes = {
  level: { control: false },
  tag: { control: false },
};
AllVariants.decorators = [ withVariants ];
AllVariants.parameters = {
  variants: Array(5).fill({}).map((variant, index) => ({
    label: `H${index + 1}`,
    level: index + 1,
  })),
};
AllVariants.play = async ({ step }) => getVariantTests(step);

export const Secondary: HeadingStoryType = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-heading--theme-secondary"><story/></div>' }),
];
Secondary.play = async ({ step }) => getVariantTests(step, '-dimmed');

export const Brand: HeadingStoryType = { ...AllVariants };
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-heading--theme-brand"><story/></div>' }),
];
Brand.play = async ({ step }) => getVariantTests(step, '-on-brand');

