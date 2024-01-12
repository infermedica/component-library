import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  UiButton,
  type ButtonProps,
} from '@index';
import { withVariants } from '@sb/decorators';
import {
  getArgTypes,
  getAttrs,
  extendEvents,
} from '@sb/helpers';
import {
  content,
  icon,
} from '@sb/helpers/argTypes/index';
import type { Icon as IconType } from '@/types';
import {
  BasicStories,
  BasicStoriesSource,
  IconStories,
  CircledStories,
} from './stories';

type ButtonArgsType = ButtonProps & {
  content?: string;
  class?: string[];
  icon?: IconType;
};
type ButtonMetaType = Meta<ButtonArgsType>;
type ButtonStoryType = StoryObj<ButtonArgsType>;

const buttonEvents = extendEvents([ 'onClick' ]);
const {
  argTypes,
  args,
} = getArgTypes(deepmerge(UiButton, buttonEvents));

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Submit',
    icon: 'plus-circled-filled',
    class: [],
    ...args,
  },
  argTypes: {
    content,
    icon,
    ...argTypes,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies ButtonMetaType;
export default meta;
export const Basic: ButtonStoryType = {
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
      <story v-bind="{...attrs}"/>
    </div>`,
}) ];
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};
export const Primary: ButtonStoryType = { ...Basic };
Primary.argTypes = {};
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
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-button--is-disabled',
    },
  ],
};
export const Outlined: ButtonStoryType = { ...Primary };
Outlined.parameters = {
  variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--outlined`,
  })) ],
};
export const Text: ButtonStoryType = { ...Primary };
Text.parameters = {
  variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--text`,
  })) ],
};
export const TextSecondary: ButtonStoryType = { ...Text };
TextSecondary.decorators = Text.decorators?.concat(
  () => ({
    name: 'TSecondary',
    template: '<div class="ui-button--theme-secondary"><story/></div>',
  }),
);
export const TextBrand: ButtonStoryType = { ...Text };
TextBrand.parameters = {
  ...Text.parameters,
  backgrounds: { default: 'brand' },
};
TextBrand.decorators = Text.decorators?.concat(
  () => ({
    name: 'TBrand',
    template: '<div class="ui-button--theme-brand"><story/></div>',
  }),
);
export const Icon: ButtonStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { IconStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes);
        return { attrs };
      },
      template: '<IconStories v-bind="{...attrs}"/>',
    };
  },
};
Icon.args = { icon: 'plus-circled-filled' };
Icon.argTypes = {};
Icon.decorators = [ withVariants ];
Icon.parameters = {
  variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--icon`,
  })) ],
};
export const IconSecondary: ButtonStoryType = { ...Icon };
IconSecondary.decorators = [
  ...Icon.decorators,
  () => ({
    name: 'TSecondary',
    template: '<div class="ui-button--theme-secondary"><story/></div>',
  }),
];
export const IconBrand: ButtonStoryType = { ...Icon };
IconBrand.parameters = {
  ...Icon.parameters,
  backgrounds: { default: 'brand' },
};
IconBrand.decorators = [
  ...Icon.decorators,
  () => ({
    name: 'TBrand',
    template: '<div class="ui-button--theme-brand"><story/></div>',
  }),
];
export const Circled: ButtonStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { CircledStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes);
        return { attrs };
      },
      template: '<CircledStories v-bind="{...attrs}"/>',
    };
  },
};
Circled.args = {
  content: '1',
  icon: 'plus-circled-filled',
};
Circled.argTypes = {};
Circled.decorators = [
  () => ({
    name: 'LFlex',
    inheritAttrs: false,
    setup() {
      const { decoratorAttrs: attrs } = useAttrs();
      return { attrs };
    },
    template: `<div class="flex gap-4">
      <story v-bind="attrs"/>
    </div>`,
  }),
  withVariants,
];
Circled.parameters = {
  variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--circled`,
  })) ],
};
export const CircledSelected: ButtonStoryType = { ...Circled };
CircledSelected.parameters = {
  variants: [ ...Circled.parameters.variants.map((variant: Record<string, unknown>) => ({
    ...variant,
    class: `${variant.class} ui-button--is-selected`,
  })) ],
};
