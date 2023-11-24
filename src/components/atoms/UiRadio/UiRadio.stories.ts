import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiRadio } from '@index';
import type { RadioProps } from '@index';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import { getArgTypes } from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';
import { useAttrs } from '@sb/composable';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type RadioArgsType = RadioProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<RadioProps['value']>[];
}
type RadioMetaType = Meta<RadioArgsType>;
type RadioStoryType = StoryObj<RadioArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiRadio);

const meta = {
  title: 'Atoms/Radio',
  component: UiRadio,
  args: {
    ...args,
    modelValue: false,
    content: 'I’m overweight or obese',
    class: [],
    value: 'overweight-or-obese',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    ...argTypes,
    content,
    modelValue: { control: 'text' },
    value: { control: 'text' },
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
Basic.decorators = [ withVModel ];
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};

export const Unchecked: StoryObj = { ...Basic };
Unchecked.decorators = [ withVariants ];
Unchecked.parameters = {
  variants: [
    {
      label: 'default',
      modelValue: '',
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: '',
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: '',
    },
    {
      label: 'disabled',
      class: 'ui-radio--is-disabled',
      modelValue: '',
      inputAttrs: { disabled: true },
    },
  ],
};

export const UncheckedHasError: StoryObj = { ...Basic };
UncheckedHasError.decorators = [ withVariants ];
UncheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-radio--has-error`,
  })) ],
};

export const Checked: StoryObj = { ...Basic };
Checked.decorators = [ withVariants ];
Checked.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    modelValue: 'overweight-or-obese',
  })) ],
};

export const CheckedHasError: StoryObj = { ...Basic };
CheckedHasError.decorators = [ withVariants ];
CheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-radio--has-error`,
    modelValue: 'overweight-or-obese',
  })) ],
};
