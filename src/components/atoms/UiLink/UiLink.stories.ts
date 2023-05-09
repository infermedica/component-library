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
import type {
  PartialStoryFn,
  PlayFunctionContext,
} from '@storybook/types';
import { defineComponent } from 'vue';
import {
  getCSSValue,
  getFocusTests,
  getStyleTests,
} from '@tests/interactions/helpers';

type LinkIconVariants = {
  icon?: IconType;
  iconEnd?: IconType;
}
type LinkArgsType = LinkProps & LinkIconVariants & {
  content?: string;
  modifiers?: string[];
  before?: string;
  after?: string;
}
type LinkMetaType = Meta<LinkArgsType>;
type LinkStoryType = StoryObj<LinkArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, LinkArgsType>;

const getBasicVariantTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const links = [ ...canvasElement.querySelectorAll('.ui-link') ];
  await step('Correct font colors', () => {
    getStyleTests(links, 'color', results);
  });
  await getFocusTests(step, [ links[2] ]);
};
const getVariantTests = (
  elements: Element[],
  property: keyof CSSStyleDeclaration,
  varName: string,
) => {
  getStyleTests(
    elements,
    property,
    [
      '',
      '-hover',
      '',
      '-active',
    ].map((state) => ({ [property]: getCSSValue(`${varName}${state}`) })),
  );
};
const getIconVariantTests = async (
  step: PlayContext['step'],
  varName: string,
) => {
  await step('Correct icon fill colors', () => {
    getVariantTests([ ...document.querySelectorAll('.ui-link__icon') ], 'fill', varName);
  });
  await getFocusTests(step, [ [ ...document.querySelectorAll('.ui-link') ][2] ]);
};
const withIconVariants = (
  story: PartialStoryFn<VueRenderer, LinkProps>,
  { parameters: { iconVariants } }: StoryContext<LinkArgsType>,
) => defineComponent({
  setup(props, { attrs }) {
    return {
      iconVariants: iconVariants.map(({
        icon, iconEnd,
      }: LinkIconVariants) => ({
        iconEnd: iconEnd ? attrs.iconEnd : undefined,
        icon: icon ? attrs.icon : undefined,
      })),
      args: attrs,
    };
  },
  template: `<template v-for="variant in iconVariants">
    <story v-bind="{
      ...args,
      ...variant
    }" />
  </template>`,
});

const UiLinkIcon = {
  components: { UiIcon },
  props: [ 'icon' ],
  template: `<UiIcon
    :icon="icon"
    class="ui-link__icon"
  />`,
};

const { argTypes } = useArgTypes(UiLink);
const meta = {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Instruction for Use',
    modifiers: [],
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

export const Basic: LinkStoryType = {
  render: () => ({
    components: {
      UiLink,
      UiLinkIcon,
    },
    setup(props, { attrs }) {
      const {
        content,
        icon,
        iconEnd,
        modifiers,
        ...args
      } = attrs;
      return {
        content,
        icon,
        iconEnd,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiLink v-bind="args">
      <UiLinkIcon
        v-if="icon"
        :icon="icon"
      />
      {{ content }}
      <UiLinkIcon
        v-if="iconEnd"
        :icon="iconEnd"
        class="ui-link__icon--end"
      />
    </UiLink>`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiLink
    :to="to"
    :href="href"
    :tag="tag"
  >{{ content }}</UiLink>
</template>

<script setup lang="ts">
import { UiLink } from '@infermedica/component-library'
</script>
`,
    },
  },
};

export const Primary: LinkStoryType = { ...Basic };
Primary.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    options: [ 'ui-link--small' ],
  },
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
Primary.play = async (context) => {
  getBasicVariantTests(context, [
    '',
    '-hover',
    '',
    '-active',
  ].map((state) => ({ color: getCSSValue(`--color-text-action-primary${state}`) })));
};

export const Secondary: LinkStoryType = { ...Basic };
Secondary.decorators = [
  () => ({ template: '<div class="ui-link--theme-secondary"><story v-bind="$attrs"/></div>' }),
  withVariants,
];
Secondary.parameters = Primary.parameters;

Secondary.play = async (context) => {
  getBasicVariantTests(context, [
    '',
    '-hover',
    '',
    '-active',
  ].map((state) => ({ color: getCSSValue(`--color-text-action-secondary${state}`) })));
};

export const Brand: LinkStoryType = { ...Secondary };
Brand.decorators = [
  () => ({ template: '<div class="ui-link--theme-brand"><story v-bind="$attrs"/></div>' }),
  withVariants,
];
Brand.parameters = {
  ...Primary.parameters,
  backgrounds: { default: 'brand' },
};
Brand.play = async (context) => {
  getBasicVariantTests(context, [
    '',
    '-hover',
    '',
    '-active',
  ].map((state) => ({ color: getCSSValue(`--color-text-on-brand${state}`) })));
};

export const Icon: LinkStoryType = {
  render: () => ({
    components: {
      UiLink,
      UiIcon,
    },
    setup(props, { attrs }) {
      const {
        icon, ...args
      } = attrs;
      return {
        icon,
        args: {
          ...args,
          class: args.modifiers,
        },
      };
    },
    template: `<UiLink
      v-bind="args"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />
    </UiLink>`,
  }),
};
Icon.args = { icon: 'plus-circled-filled' };
Icon.argTypes = {
  iconEnd: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Icon.decorators = [ withVariants ];
Icon.parameters = Primary.parameters;
Icon.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-icon-primary',
);

export const IconSecondary: LinkStoryType = { ...Icon };
IconSecondary.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-link--theme-secondary"><story/></div>' }),
];
IconSecondary.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-icon-secondary',
);
export const IconBrand: LinkStoryType = { ...Icon };
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-link--theme-brand"><story/></div>' }),
];
IconBrand.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-text-on-brand',
);

export const WithIcon: LinkStoryType = { ...Basic };
WithIcon.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
WithIcon.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
WithIcon.decorators = [
  withIconVariants,
  () => ({ template: '<div class="flex gap-4"><story v-bind="$attrs"/></div>' }),
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

export const LinkInLongText: LinkStoryType = {
  render: () => ({
    components: {
      UiLink,
      UiText,
      UiLinkIcon,
    },
    setup(props, { attrs }) {
      const {
        content,
        before,
        after,
        icon,
        iconEnd,
        modifiers,
        ...args
      } = attrs;
      return {
        content,
        before: `${before} `,
        after: ` ${after}`,
        icon,
        iconEnd,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiText class="max-w-150">
      {{ before }}<UiLink v-bind="args">
        <UiLinkIcon
          v-if="icon"
          :icon="icon"
        />
        {{ content }}
        <UiLinkIcon
          v-if="iconEnd"
          :icon="iconEnd"
          class="ui-link__icon--end"/>
      </UiLink>{{ after }}
    </UiText>`,
  }),
};
LinkInLongText.args = {
  content: 'Medical Guidance Platform',
  before: 'Healthcare is complex, and whether you’re a patient, provider, payer, or administrator, we all need a helping hand from time to time. Imagine a world where personalized help was available whenever you needed it. With Infermedica’s AI-powered',
  after: '(MGP), constant support is at our fingertips.',
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',

};
LinkInLongText.decorators = [
  withIconVariants,
  () => ({
    setup(props, { attrs }) {
      return { attrs };
    },
    template: '<div class="flex flex-col gap-2"><story v-bind="attrs"/></div>',
  }),
];
LinkInLongText.parameters = {
  iconVariants: [
    {},
    { icon: LinkInLongText.args.icon },
    { iconEnd: LinkInLongText.args.iconEnd },
  ],
};
