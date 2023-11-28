import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiLink } from '@index';
import { getArgTypes } from '@sb/helpers';
import { useAttrs } from '@sb/composable';
import {
  content,
  icon,
} from '@sb/helpers/argTypes/index';
import { withVariants } from '@sb/decorators';
import {
  BasicStories,
  BasicStoriesSource,
  TextStories,
  TextStoriesSource,
} from './stories';

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
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<BasicStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Basic.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { decoratorAttrs: attrs } = useAttrs();
    return { attrs };
  },
  template: `<div class="flex gap-4">
      <story v-bind="attrs"/>
    </div>`,
}) ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Primary: StoryObj = { ...Basic };
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

export const Secondary: StoryObj = { ...Primary };
Secondary.decorators = Primary.decorators?.concat(
  () => ({
    name: 'TSecondary',
    template: '<div class="ui-link--theme-secondary"><story/></div>',
  }),
);

export const Brand: StoryObj = { ...Primary };
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

export const Small: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<BasicStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Small.args = { class: [ 'ui-link--small' ] };
Small.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { decoratorAttrs: attrs } = useAttrs();
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
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<TextStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Text.args = { content: 'Inference Engine\'s' };
Text.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { decoratorAttrs: attrs } = useAttrs();
    return { attrs };
  },
  template: `<div class="flex flex-col gap-4">
      <story v-bind="attrs"/>
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
