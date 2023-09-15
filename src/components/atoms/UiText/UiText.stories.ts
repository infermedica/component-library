import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiText } from '@index';
import type { TextProps } from '@index';
import { withVariants } from '@sb/decorators';
import { getArgTypes } from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type TextArgsType = TextProps & {
  content?: string;
}
type TextMetaType = Meta<TextArgsType>;
type TextStoryType = StoryObj<TextArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiText);

const meta = {
  title: 'Atoms/Text',
  component: UiText,
  args: {
    content: 'How to use it?',
    class: [],
    ...args,
  },
  argTypes: {
    content,
    ...argTypes,
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

export const Basic: StoryObj = { render: () => (BasicStories) };
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};
export const Variants: TextStoryType = { ...Basic };
Variants.argTypes = {
  level: { control: false },
  tag: { control: false },
};
Variants.decorators = [ withVariants ];
Variants.parameters = {
  variants: meta.argTypes.class?.options.map((variant: string) => ({
    label: `${variant.replace('ui-text--', '')}`,
    class: `${variant}`,
  })),
};
export const Secondary: TextStoryType = { ...Variants };
Secondary.decorators = [
  ...Variants.decorators,
  (story, { id }) => ({
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: `<div class="ui-text--theme-secondary">
      <story 
        v-bind="attrs" 
        :key="id"
      />
    </div>`,
  }),
];
export const Brand: TextStoryType = { ...Variants };
Brand.parameters = {
  ...Variants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...Variants.decorators,
  (story, { id }) => ({
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: `<div class="ui-text--theme-brand">
      <story 
        v-bind="attrs" 
        :key="id"
      />
    </div>`,
  }),
];
