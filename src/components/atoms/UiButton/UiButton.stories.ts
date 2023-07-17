import type {
  Meta,
  StoryContext,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  UiButton,
  UiIcon,
  UiText,
} from '@index';
import type { ButtonProps } from '@index';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';
import {
  content as contentArgsType,
  icon as iconArgsType,
} from '@sb/helpers/argTypes/index';
import type { PartialStoryFn } from '@storybook/types';
import type { Icon as IconType } from '@/types';
import { defineComponent } from 'vue';

type ButtonArgsType = ButtonProps & {
  content?: string;
  class?: string[];
  target?: string;
  icon?: IconType;
  iconEnd?: IconType
}
type ButtonMetaType = Meta<ButtonArgsType>;
type ButtonStoryType = StoryObj<ButtonArgsType>;

const buttonEvents = extendEvents([ 'onClick' ]);
const { argTypes } = useArgTypes(deepmerge(UiButton, buttonEvents));
import {
  BasicStories,
  BasicStoriesSource,
  IconStories,
  IconStoriesSource,
  CircledStories,
  CircledStoriesSource,
} from './stories';

const withIconVariants = (
  story: PartialStoryFn<VueRenderer, ButtonProps>,
  { parameters: { iconVariants } }: StoryContext<ButtonArgsType>,
) => defineComponent({
  components: { story },
  setup(props, { attrs }) {
    return {
      iconVariants: (iconVariants as Record<string, unknown>[]).map(({
        icon, iconEnd,
      }) => ({
        iconEnd: iconEnd
          ? attrs.iconEnd
          : undefined,
        icon: icon
          ? attrs.icon
          : undefined,
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

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Submit',
    class: [],
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
} satisfies ButtonMetaType;
export default meta;

export const Basic: ButtonStoryType = { render: () => (BasicStories) };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
};

export const RouterButton: ButtonStoryType = { ...Basic };
RouterButton.args = { to: { path: '/blog/medical-guide-platform' } };
RouterButton.argTypes = {
  tag: { control: false },
  href: { control: false },
};

export const LinkButton: ButtonStoryType = { ...Basic };
LinkButton.args = {
  href: 'https://www.infermedica.com',
  target: '_blank',
};
LinkButton.argTypes = {
  tag: { control: false },
  to: { control: false },
};

export const Primary: ButtonStoryType = { ...Basic };
Primary.argTypes = {
  class: { options: [ 'ui-button--small' ] },
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
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Outlined: ButtonStoryType = { ...Primary };
Outlined.parameters = {
  variants: {
    ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
      ...variant,
      class: `${variant.class} ui-button--outlined`,
    })),
  },
};

export const Text: ButtonStoryType = { ...Primary };
Text.parameters = {
  variants: {
    ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
      ...variant,
      class: `${variant.class} ui-button--text`,
    })),
  },
};

export const TextSecondary: ButtonStoryType = { ...Text };
TextSecondary.decorators = Text.decorators?.concat(
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-button--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
);

export const TextBrand: ButtonStoryType = { ...Text };
TextBrand.parameters = {
  ...Text.parameters,
  backgrounds: { default: 'brand' },
};
TextBrand.decorators = Text.decorators?.concat(
  (story, { id }) => ({
    components: { story },
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="ui-button--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
);

export const Icon: ButtonStoryType = { render: () => (IconStories) };
Icon.args = { icon: 'plus-circled-filled' };
Icon.argTypes = {
  iconEnd: { control: false },
  class: { control: false },
  content: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Icon.decorators = [ withVariants ];
Icon.parameters = { ...Text.parameters };

export const IconSecondary: ButtonStoryType = { ...Icon };
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
    template: '<div class="ui-button--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const IconBrand: ButtonStoryType = { ...Icon };
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
    template: '<div class="ui-button--theme-brand"><story v-bind="attrs" :key="id"/></div>',
  }),
];

export const Circled: ButtonStoryType = { render: () => (CircledStories) };
Circled.args = {
  content: '1',
  icon: 'plus-circled-filled',
};
Circled.argTypes = {
  iconEnd: { control: false },
  class: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Circled.decorators = [
  (story, { id }) => ({
    inheritAttrs: false,
    setup(props, { attrs }) {
      return {
        attrs,
        id,
      };
    },
    template: '<div class="flex gap-2"><story v-bind="attrs" :key="id"/></div>',
  }),
  withVariants,
];
Circled.parameters = {
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
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
};

export const CircledSelected: ButtonStoryType = { ...Circled };
CircledSelected.parameters = {
  variants: [ ...Circled.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--is-selected`,
  })) ],
};

export const WithIcon: ButtonStoryType = { ...Basic };
WithIcon.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
WithIcon.argTypes = {
  class: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
WithIcon.decorators = [
  withIconVariants,
  ...Circled.decorators,
];
WithIcon.parameters = {
  iconVariants: [
    { icon: WithIcon.args.icon },
    { iconEnd: WithIcon.args.iconEnd },
  ],
  variants: [
    { label: 'primary' },
    {
      label: 'outlined',
      class: 'ui-button--outlined',
    },
    {
      label: 'text',
      class: 'ui-button--text',
    },
  ],
};

export const Small: ButtonStoryType = { ...Basic };
Small.args = {
  icon: 'plus-circled-filled',
  iconEnd: 'plus-circled-filled',
};
Small.argTypes = {
  class: { control: false },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Small.decorators = [
  withIconVariants,
  ...Circled.decorators,
];
Small.parameters = {
  iconVariants: [
    {},
    { icon: Small.args.icon },
    { iconEnd: Small.args.iconEnd },
  ],
  variants: [ ...WithIcon.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--small`,
  })) ],
};
