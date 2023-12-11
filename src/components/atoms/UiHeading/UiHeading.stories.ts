import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiHeading } from '@index';
import type { HeadingProps } from '@index';
import { withVariants } from '@sb/decorators';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type HeadingArgsType = HeadingProps & {
  content?: string;
}
type HeadingMetaType = Meta<HeadingArgsType>;
type HeadingStoryType = StoryObj<HeadingArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiHeading);

const meta = {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: {
    ...args,
    content: 'How to use it?',
    class: [],
    tag: '',
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
  },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
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
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};
export const Variants: HeadingStoryType = { ...Basic };
Variants.argTypes = {
  level: { control: false },
  tag: { control: false },
};
Variants.decorators = [ withVariants ];
Variants.parameters = {
  variants: Array(5).fill({}).map((variant, index) => ({
    label: `H${index + 1}`,
    level: index + 1,
  })),
};
export const Secondary: HeadingStoryType = { ...Variants };
Secondary.decorators = [
  ...Variants.decorators,
  () => ({
    name: 'TSecondary',
    template: '<div class="ui-heading--theme-secondary"><story/></div>',
  }),
];
export const Brand: HeadingStoryType = { ...Variants };
Brand.parameters = {
  ...Variants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...Variants.decorators,
  () => ({
    name: 'TBrand',
    template: '<div class="ui-heading--theme-brand"><story/></div>',
  }),
];
