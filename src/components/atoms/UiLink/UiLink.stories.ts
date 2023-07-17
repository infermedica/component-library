import type {
  Meta,
  StoryObj,
  VueRenderer,
  StoryContext,
} from '@storybook/vue3';
import {
  UiLink,
  UiIcon,
  UiText,
} from '@index';
import type { LinkProps } from '@index';
import type { Icon as IconType } from '@/types';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import {
  content as contentArgsType,
  icon as iconArgsType,
} from '@sb/helpers/argTypes/index';
import type { PartialStoryFn } from '@storybook/types';
import {
  computed,
  defineComponent,
  toRefs,
} from 'vue';

type LinkIconVariants = {
  icon?: IconType;
  iconEnd?: IconType;
}
type LinkArgsType = LinkProps & LinkIconVariants & {
  content?: string;
  class?: string[];
  before?: string;
  after?: string;
}
type LinkMetaType = Meta<LinkArgsType>;
type LinkStoryType = StoryObj<LinkArgsType>;

const withIconVariants = (
  story: PartialStoryFn<VueRenderer, LinkProps>,
  { parameters: { iconVariants } }: StoryContext<LinkArgsType>,
) => defineComponent({
  setup(props, { attrs }) {
    const args = computed(() => (attrs));
    return {
      iconVariants: iconVariants.map(({
        icon, iconEnd,
      }: LinkIconVariants) => ({
        iconEnd: iconEnd ? attrs.iconEnd : undefined,
        icon: icon ? attrs.icon : undefined,
      })),
      args,
    };
  },
  template: `<template v-for="variant in iconVariants">
    <story 
        v-bind="args" 
        v-bind="variant"
    />
  </template>`,
});

const { argTypes } = useArgTypes(UiLink);
import {
  BasicStories,
  BasicStoriesSource,
  IconStories,
  IconStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Instruction for Use',
    icon: '',
    iconEnd: '',
    class: [],
    href: 'https://infermedica.com/',
  },
  argTypes: {
    ...argTypes,
    content: contentArgsType,
    icon: iconArgsType,
    iconEnd: {
      name: 'icon-end',
      ...iconArgsType,
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies LinkMetaType;
export default meta;

export const Basic: LinkStoryType = { render: () => (BasicStories) };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
};

export const Primary: LinkStoryType = { ...Basic };
Primary.argTypes = {
  class: { options: [ 'ui-link--small' ] },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Primary.decorators = [ withVariants ];
Primary.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Secondary: LinkStoryType = { ...Basic };
Secondary.decorators = [
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-link--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
  withVariants,
];
Secondary.parameters = Primary.parameters;

export const Brand: LinkStoryType = { ...Secondary };
Brand.decorators = [
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-link--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
  withVariants,
];
Brand.parameters = {
  ...Primary.parameters,
  backgrounds: { default: 'brand' },
};

export const Icon: LinkStoryType = { render: () => (IconStories) };
Icon.args = { icon: 'plus-circled-filled' };
Icon.argTypes = {
  iconEnd: { control: false },
  class: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Icon.decorators = [ withVariants ];
Icon.parameters = Primary.parameters;

export const IconSecondary: LinkStoryType = { ...Icon };
IconSecondary.decorators = [
  ...Icon.decorators,
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-link--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const IconBrand: LinkStoryType = { ...Icon };
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-link--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const WithIcon: LinkStoryType = { ...Basic };
WithIcon.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
WithIcon.argTypes = {
  class: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
WithIcon.decorators = [
  withIconVariants,
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="flex gap-4"><story v-bind="attrs" :key="id"/></div>',
  }),
  withVariants,
];
WithIcon.parameters = {
  iconVariants: [
    { icon: WithIcon.args.icon },
    { iconEnd: WithIcon.args.iconEnd },
  ],
  variants: [
    { label: 'primary' },
    {
      label: 'secondary',
      class: 'ui-link--secondary',
    },
  ],
};

export const Small: LinkStoryType = { ...WithIcon };
Small.argTypes = { modifiers: { control: false } };
Small.parameters = {
  ...WithIcon.parameters,
  variants:
  WithIcon.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `${variant.class} ui-link--small`,
    }),
  ),
};

export const LinkInLongText: LinkStoryType = { render: () => (BasicStories) };
LinkInLongText.args = {
  content: 'Medical Guidance Platform',
  before: 'Healthcare is complex, and whether you’re a patient, provider, payer, or administrator, we all need a helping hand from time to time. Imagine a world where personalized help was available whenever you needed it. With Infermedica’s AI-powered',
  after: '(MGP), constant support is at our fingertips.',
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',

};
LinkInLongText.argTypes = {
  before: {
    control: 'text',
    table: { category: 'stories controls' },
  },
  after: {
    control: 'text',
    table: { category: 'stories controls' },
  },
},
LinkInLongText.decorators = [
  (story, { id }) => ({
    inheritAttrs: false,
    components: {
      story,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        before,
        after,
      } = toRefs(attrs);

      return {
        attrs,
        id,
        before,
        after,
      };
    },
    template: `<UiText>
      {{ before }}
      <story 
        v-bind="attrs"
        :key="id"
      />
      {{ after }}
    </UiText>`,
  }),
  withIconVariants,
  (story, { id }) => ({
    inheritAttrs: false,
    setup(props, { attrs }) {
      return { attrs };
    },
    template: `<div class="flex flex-col gap-2">
      <story 
        v-bind="attrs"
        :key="id"
      />
    </div>`,
  }),
];
LinkInLongText.parameters = {
  iconVariants: [
    {},
    { icon: LinkInLongText.args.icon },
    { iconEnd: LinkInLongText.args.iconEnd },
  ],
};
