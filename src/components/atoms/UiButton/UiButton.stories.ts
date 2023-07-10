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
import {
  getCSSValue,
  getStyleTests,
  getFocusTests,
} from '@tests/interactions/helpers';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';
import {
  content as contentArgsType,
  icon as iconArgsType,
} from '@sb/helpers/argTypes/index';
import type {
  PartialStoryFn,
  PlayFunctionContext,
} from '@storybook/types';
import type { Icon as IconType } from '@/types';
import { defineComponent } from 'vue';

type ButtonArgsType = ButtonProps & {
  content?: string;
  modifiers?: string[];
  target?: string;
  icon?: IconType;
  iconEnd?: IconType
}
type ButtonMetaType = Meta<ButtonArgsType>;
type ButtonStoryType = StoryObj<ButtonArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, ButtonArgsType>;

const getBasicVariantTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const buttons = [ ...canvasElement.querySelectorAll('.ui-button') ];
  await step('Correct background colors', () => {
    getStyleTests(buttons, 'backgroundColor', results);
  });
  await step('Correct font colors', () => {
    getStyleTests(buttons, 'color', results);
  });
  await getFocusTests(step, [ buttons[2] ]);
};
const getVariantTests = (
  elements: Element[],
  property: keyof CSSStyleDeclaration,
  varName: string,
  disabledVarName: string,
) => {
  getStyleTests(
    elements,
    property,
    [
      ...[
        '',
        '-hover',
        '',
        '-active',
      ].map((state) => ({ [property]: getCSSValue(`${varName}${state}`) })),
      { [property]: getCSSValue(disabledVarName) },
    ],
  );
};
const getTextVariantTests = async (
  step: PlayContext['step'],
  varName: string,
  disabledVarName: string,
) => {
  await step('Correct font colors', () => {
    getVariantTests([ ...document.querySelectorAll('.ui-button') ], 'color', varName, disabledVarName);
  });
  await getFocusTests(step, [ [ ...document.querySelectorAll('.ui-button') ][2] ]);
};
const getIconVariantTests = async (
  step: PlayContext['step'],
  varName: string,
  disabledVarName: string,
) => {
  await step('Correct icon fill colors', () => {
    getVariantTests([ ...document.querySelectorAll('.ui-button__icon') ], 'fill', varName, disabledVarName);
  });
  await getFocusTests(step, [ [ ...document.querySelectorAll('.ui-button') ][2] ]);
};
const buttonEvents = extendEvents([ 'onClick' ]);
const { argTypes } = useArgTypes(deepmerge(UiButton, buttonEvents));
import {
  BasicStories,
  BasicStoriesSource,
  IconStories,
  CircledStories,
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
    modifiers: [],
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

export const Basic: ButtonStoryType = { render: () => BasicStories };
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
RouterButton.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const LinkButton: ButtonStoryType = { ...Basic };
LinkButton.args = {
  href: 'https://www.infermedica.com',
  target: '_blank',
};
LinkButton.argTypes = {
  tag: { control: false },
  to: { control: false },
};
LinkButton.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const Primary: ButtonStoryType = { ...Basic };
Primary.argTypes = {
  modifiers: {
    ...meta.argTypes.modifiers,
    options: [ 'ui-button--small' ],
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
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};
Primary.play = async (context) => {
  getBasicVariantTests(context, [
    ...[
      '',
      '-hover',
      '',
      '-active',
    ].map((state) => ({
      backgroundColor: getCSSValue(`--color-background-action${state}`),
      color: getCSSValue('--color-text-on-action'),
    })),
    {
      backgroundColor: getCSSValue('--color-background-disabled'),
      color: getCSSValue('--color-text-on-action'),
    },
  ]);
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
Outlined.play = async (context) => {
  getBasicVariantTests(context, [
    ...[
      '',
      '-hover',
      '',
      '-active',
    ].map((state) => ({
      backgroundColor: getCSSValue(state.length
        ? `--color-background-white${state}`
        : 'transparent'),
      color: getCSSValue(`--color-text-action-primary${state}`),
    })),
    {
      backgroundColor: getCSSValue('transparent'),
      color: getCSSValue('--color-text-disabled'),
    },
  ]);
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
Text.play = async ({ step }) => {
  getTextVariantTests(
    step,
    '--color-text-action-primary',
    '--color-text-disabled',
  );
};

export const TextSecondary: ButtonStoryType = { ...Text };
TextSecondary.decorators = Text.decorators?.concat(
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' }),
);
TextSecondary.play = async ({ step }) => {
  getTextVariantTests(
    step,
    '--color-text-action-secondary',
    '--color-text-disabled',
  );
};

export const TextBrand: ButtonStoryType = { ...Text };
TextBrand.parameters = {
  ...Text.parameters,
  backgrounds: { default: 'brand' },
};
TextBrand.decorators = Text.decorators?.concat(
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' }),
);
TextBrand.play = async ({ step }) => {
  getTextVariantTests(
    step,
    '--color-text-on-brand',
    '--color-text-on-brand-disabled',
  );
};

export const Icon: ButtonStoryType = { render: () => IconStories };
Icon.args = {
  icon: 'plus-circled-filled',
  modifiers: [ 'ui-button--icon' ],
};
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
Icon.parameters = { ...Text.parameters };
Icon.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-icon-primary',
  '--color-icon-disabled',
);

export const IconSecondary: ButtonStoryType = { ...Icon };
IconSecondary.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-secondary"><story/></div>' }),
];
IconSecondary.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-icon-secondary',
  '--color-icon-disabled',
);

export const IconBrand: ButtonStoryType = { ...Icon };
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  () => ({ template: '<div class="ui-button--theme-brand"><story/></div>' }),
];
IconBrand.play = async ({ step }) => getIconVariantTests(
  step,
  '--color-text-on-brand',
  '--color-text-on-brand-disabled',
);

export const Circled: ButtonStoryType = { render: () => CircledStories };
Circled.args = {
  content: '1',
  icon: 'plus-circled-filled',
  modifiers: [ 'ui-button--circled' ],
};
Circled.argTypes = {
  iconEnd: { control: false },
  modifiers: {
    ...meta.argTypes.modifiers,
    control: false,
  },
  to: { control: false },
  tag: { control: false },
  href: { control: false },
};
Circled.decorators = [
  () => ({
    setup(props, { attrs }) {
      return { attrs };
    },
    template: '<div class="flex gap-2"><story v-bind="attrs"/></div>',
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
  modifiers: { control: false },
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
