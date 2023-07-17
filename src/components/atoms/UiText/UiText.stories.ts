import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiText } from '@index';
import type { TextProps } from '@index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';

type TextArgsType = TextProps & {
  content?: string;
  class?: string[];
}
type TextMetaType = Meta<TextArgsType>;
type TextStoryType = StoryObj<TextArgsType>;

const { argTypes } = useArgTypes(UiText);
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Text',
  component: UiText,
  args: {
    content: 'How to use it?',
    class: [],
  },
  argTypes: {
    ...argTypes,
    content,
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

export const Basic: TextStoryType = { render: () => (BasicStories) };
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const AllVariants: TextStoryType = { ...Basic };
AllVariants.argTypes = {
  tag: { control: false },
  class: { control: false },
};
AllVariants.decorators = [ withVariants ];
AllVariants.parameters = {
  variants: meta.argTypes.class?.options.map((variant: string) => ({
    label: `${variant.replace('ui-text--', '')}`,
    class: `${variant}`,
  })),
};

export const Secondary: TextStoryType = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-text--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const Brand: TextStoryType = { ...AllVariants };
Brand.decorators = [
  ...AllVariants.decorators,
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-text--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
];
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
