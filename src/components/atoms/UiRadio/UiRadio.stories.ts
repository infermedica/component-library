import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiRadio,
  type RadioProps,
} from '@index';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';
import {
  BasicStories,
  BasicStoriesSource,
  GroupStories,
  GroupStoriesSource,
} from './stories';

type RadioArgsType = RadioProps & {
  content?: string;
  class?: string[];
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
    modelValue: '',
    content: 'I’m overweight or obese',
    class: [],
    value: 'I’m overweight or obese',
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
} satisfies RadioMetaType;
export default meta;

export const Basic: RadioStoryType = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{ ...attrs }"/>',
    };
  },
};
Basic.decorators = [ withVModel ];
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};

export const Unchecked: RadioStoryType = { ...Basic };
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

export const UncheckedHasError: RadioStoryType = { ...Basic };
UncheckedHasError.decorators = [ withVariants ];
UncheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-radio--has-error`,
  })) ],
};

export const Checked: RadioStoryType = { ...Basic };
Checked.decorators = [ withVariants ];
Checked.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    modelValue: 'overweight-or-obese',
  })) ],
};

export const CheckedHasError: RadioStoryType = { ...Basic };
CheckedHasError.decorators = [ withVariants ];
CheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-radio--has-error`,
    modelValue: 'overweight-or-obese',
  })) ],
};

export const PrimitiveTypes: RadioStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { GroupStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<GroupStories v-bind="{ ...attrs }"/>',
    };
  },
};
PrimitiveTypes.args = {
  modelValue: 'I have hypertension',
  items: [
    'I have diabetes',
    'I’m overweight or obese',
    'I have hypertension',
  ],
};
PrimitiveTypes.argTypes = { items: { table: { category: 'stories controls' } } };
PrimitiveTypes.decorators = [ withVModel ];
PrimitiveTypes.parameters = {
  chromatic: { disableSnapshot: true },
  controls: { exclude: [ 'content' ] },
};

export const Objets: RadioStoryType = { ...PrimitiveTypes };
Objets.args = {
  modelValue: {
    id: 'i-have-diabetes',
    label: 'I have diabetes',
  },
  items: [
    {
      id: 'i-have-diabetes',
      label: 'I have diabetes',
    },
    {
      id: 'i-m-overweight-or-obese',
      label: 'I’m overweight or obese',
    },
    {
      id: 'i-have-hypertension',
      label: 'I have hypertension',
    },
  ],
};

export const NestedObjets: RadioStoryType = { ...PrimitiveTypes };
NestedObjets.args = {
  modelValue: {
    id: 'i-m-overweight-or-obese',
    label: 'I’m overweight or obese',
    inputAttrs: { 'data-testid': 'input-i-m-overweight-or-obese' },
  },
  items: [
    {
      id: 'i-have-diabetes',
      label: 'I have diabetes',
      inputAttrs: { 'data-testid': 'input-i-have-diabetes' },
    },
    {
      id: 'i-m-overweight-or-obese',
      label: 'I’m overweight or obese',
      inputAttrs: { 'data-testid': 'input-i-m-overweight-or-obese' },
    },
    {
      id: 'i-have-hypertension',
      label: 'I have hypertension',
      inputAttrs: { 'data-testid': 'input-i-have-hypertension' },
    },
  ],
};
