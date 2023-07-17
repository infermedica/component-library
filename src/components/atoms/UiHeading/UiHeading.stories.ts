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
import { content } from '@sb/helpers/argTypes/index';

type HeadingArgsType = HeadingProps & {
  content?: string;
}
type HeadingMetaType = Meta<HeadingArgsType>;
type HeadingStoryType = StoryObj<HeadingArgsType>;

const { argTypes } = useArgTypes(UiHeading);
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

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

export const Basic: HeadingStoryType = { render: () => (BasicStories) };
Basic.args = { level: 2 };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
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

export const Secondary: HeadingStoryType = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  (story, { id }) => ({
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-heading--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const Brand: HeadingStoryType = { ...AllVariants };
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...AllVariants.decorators,
  (story, { id }) => ({
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-heading--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
];

