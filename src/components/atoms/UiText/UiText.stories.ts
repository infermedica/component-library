import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiText } from '@index';
import type { TextProps } from '@index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import { content as contentArgTypes } from '@sb/helpers/argTypes/index';

type TextArgsType = TextProps & {
  content?: string;
  modifiers?: string[];
}
type TextMetaType = Meta<TextArgsType>;
type TextStoryType = StoryObj<TextArgsType>;

const { argTypes } = useArgTypes(UiText);
const meta = {
  title: 'Atoms/Text',
  component: UiText,
  args: { content: 'How to use it?' },
  argTypes: {
    ...argTypes,
    content: contentArgTypes,
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
} satisfies TextMetaType;
export default meta;

export const Basic: TextStoryType = {
  render: () => ({
    components: { UiText },
    setup(props, { attrs }) {
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
</script>`,
    },
  },
};

export const AllVariants: TextStoryType = { ...Basic };
AllVariants.argTypes = {
  tag: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
};
AllVariants.decorators = [ withVariants ];
AllVariants.parameters = {
  variants: meta.argTypes.modifiers?.options.map((variant: string) => ({
    label: `${variant.replace('ui-text--', '')}`,
    class: `${variant}`,
  })),
};

export const Secondary: TextStoryType = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-secondary"><story/></div>' }),
];

export const Brand: TextStoryType = { ...AllVariants };
Brand.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-brand"><story/></div>' }),
];
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
