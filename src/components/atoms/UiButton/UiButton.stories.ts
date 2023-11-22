import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import { UiButton } from '@index';
import type { ButtonProps } from '@index';
import { withVariants } from '@sb/decorators';
import {
  getArgTypes,
  extendEvents,
} from '@sb/helpers';
import {
  useAttrs
} from '@sb/composable';
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
  target?: string;
  icon?: IconType;
  iconEnd?: IconType
}
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
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render(args) {
    return {
      name: 'SBasic',
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
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};
Basic.decorators = [ () => ({
  name: 'LFlex',
  inheritAttrs: false,
  setup() {
    const { decoratorAttrs: attrs } = useAttrs();
    return { attrs };
  },
  template: `<div class="flex gap-2">
      <story v-bind="attrs"/>
    </div>`,
}) ];
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
// export const Outlined: ButtonStoryType = { ...Primary };
// Outlined.parameters = {
//   variants: {
//     ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
//       ...variant,
//       class: `${variant.class} ui-button--outlined`,
//     })),
//   },
// };
// export const Text: ButtonStoryType = { ...Primary };
// Text.parameters = {
//   variants: {
//     ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
//       ...variant,
//       class: `${variant.class} ui-button--text`,
//     })),
//   },
// };
// export const TextSecondary: ButtonStoryType = { ...Text };
// TextSecondary.decorators = Text.decorators?.concat(
//   (story, { id }) => ({
//     components: { story },
//     setup(props, { attrs }) {
//       return {
//         attrs,
//         id,
//       };
//     },
//     template: '<div class="ui-button--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
//   }),
// );
// export const TextBrand: ButtonStoryType = { ...Text };
// TextBrand.parameters = {
//   ...Text.parameters,
//   backgrounds: { default: 'brand' },
// };
// TextBrand.decorators = Text.decorators?.concat(
//   (story, { id }) => ({
//     components: { story },
//     setup(props, { attrs }) {
//       return {
//         attrs,
//         id,
//       };
//     },
//     template: '<div class="ui-button--theme-brand"><story v-bind="attrs" :key="id"/></div>',
//   }),
// );
// export const Icon: ButtonStoryType = { render: () => (IconStories) };
// Icon.args = { icon: 'plus-circled-filled' };
// Icon.argTypes = {};
// Icon.decorators = [ withVariants ];
// Icon.parameters = {
//   variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
//     ...variant,
//     class: `${variant.class} ui-button--icon`,
//   })) ],
// };
// export const IconSecondary: ButtonStoryType = { ...Icon };
// IconSecondary.decorators = [
//   ...Icon.decorators,
//   (story, { id }) => ({
//     components: { story },
//     setup(props, { attrs }) {
//       return {
//         attrs,
//         id,
//       };
//     },
//     template: '<div class="ui-button--theme-secondary"><story v-bind="attrs" :key="id"/></div>',
//   }),
// ];
// export const IconBrand: ButtonStoryType = { ...Icon };
// IconBrand.parameters = {
//   ...Icon.parameters,
//   backgrounds: { default: 'brand' },
// };
// IconBrand.decorators = [
//   ...Icon.decorators,
//   (story, { id }) => ({
//     components: { story },
//     setup(props, { attrs }) {
//       return {
//         attrs,
//         id,
//       };
//     },
//     template: '<div class="ui-button--theme-brand"><story v-bind="attrs" :key="id"/></div>',
//   }),
// ];
// export const Circled: ButtonStoryType = { render: () => (CircledStories) };
// Circled.args = {
//   content: '1',
//   icon: 'plus-circled-filled',
// };
// Circled.argTypes = {};
// Circled.decorators = [
//   (story, { id }) => ({
//     inheritAttrs: false,
//     setup(props, { attrs }) {
//       return {
//         attrs,
//         id,
//       };
//     },
//     template: `<div class="flex gap-2">
//       <story
//         v-bind="attrs"
//         :key="id"
//       />
//     </div>`,
//   }),
//   withVariants,
// ];
// Circled.parameters = {
//   variants: [ ...Primary.parameters.variants.map((variant: Record<string, unknown>) => ({
//     ...variant,
//     class: `${variant.class} ui-button--circled`,
//   })) ],
// };
// export const CircledSelected: ButtonStoryType = { ...Circled };
// CircledSelected.parameters = {
//   variants: [ ...Circled.parameters.variants.map((variant: Record<string, unknown>) => ({
//     ...variant,
//     class: `${variant.class} ui-button--is-selected`,
//   })) ],
// };
