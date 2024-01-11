import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiLink,
  type LinkProps,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  content,
  icon,
} from '@sb/helpers/argTypes/index';
import type { Icon as IconType } from '@/types';
import { withVariants } from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
  TextStories,
  TextStoriesSource,
} from './stories';

type LinkArgsType = LinkProps & {
  content?: string;
  class?: string[];
  icon?: IconType;
};
type LinkMetaType = Meta<LinkArgsType>;
type LinkStoryType = StoryObj<LinkArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiLink);

const meta = {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    ...args,
    content: 'Instruction for Use',
    icon: 'plus-circled-filled',
    class: [],
    href: '#',
  },
  argTypes: {
    content,
    icon,
    ...argTypes,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies LinkMetaType;
export default meta;

export const Basic: LinkStoryType = {
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
      template: '<BasicStories v-bind="{...attrs}"/>',
    };
  },
};
Basic.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { attrs } = getAttrs();
    return { attrs };
  },
  template: `<div class="flex gap-4">
      <story v-bind="attrs"/>
    </div>`,
}) ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Primary: LinkStoryType = { ...Basic };
Primary.decorators = [
  ...Basic.decorators,
  withVariants,
];
Primary.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'active',
      'focus',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
  ],
};

export const Secondary: LinkStoryType = { ...Primary };
Secondary.decorators = Primary.decorators?.concat(
  () => ({
    name: 'TSecondary',
    template: '<div class="ui-link--theme-secondary"><story/></div>',
  }),
);

export const Brand: LinkStoryType = { ...Primary };
Brand.decorators = Primary.decorators?.concat(
  () => ({
    name: 'TBrand',
    template: '<div class="ui-link--theme-brand"><story/></div>',
  }),
);
Brand.parameters = {
  ...Primary.parameters,
  backgrounds: { default: 'brand' },
};

export const Small: LinkStoryType = { ...Basic };
Small.args = { class: [ 'ui-link--small' ] };
Small.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { attrs } = getAttrs();
    return { attrs };
  },
  template: `<div class="flex gap-4">
      <story v-bind="attrs"/>
    </div>`,
}) ];
Small.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Text: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { TextStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<TextStories v-bind="{ ...attrs }"/>',
    };
  },
};
Text.args = { content: 'Inference Engine\'s' };
Text.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { attrs } = getAttrs();
    return { attrs };
  },
  template: `<div class="flex flex-col gap-4">
      <story v-bind="{ ...attrs }"/>
    </div>`,
}) ];
Text.parameters = {
  chromatic: {
    viewports: [
      320,
      1200,
    ],
  },
};
