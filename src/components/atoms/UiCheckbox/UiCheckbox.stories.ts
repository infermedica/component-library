import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiCheckbox,
  type CheckboxProps,
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

type CheckboxArgsType = CheckboxProps & {
  content?: string;
  class?: string[];
  items?: Required<CheckboxProps['value']>[];
};
type CheckboxMetaType = Meta<CheckboxArgsType>;
type CheckboxStoryType = StoryObj<CheckboxArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiCheckbox);

const meta = {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  args: {
    content: 'I read and accept Terms of Service and Privacy Policy.',
    items: [],
    class: [],
    modelValue: false,
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
    ...args,
  },
  argTypes: {
    ...argTypes,
    content,
    modelValue: { control: 'boolean' },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { exclude: [ 'items' ] },
  },
} satisfies CheckboxMetaType;
export default meta;

export const Basic: CheckboxStoryType = {
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
      modelValue: false,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: false,
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: false,
    },
    {
      label: 'disabled',
      class: 'ui-checkbox--is-disabled',
      inputAttrs: { disabled: true },
    },
  ],
};

export const UncheckedHasError: CheckboxStoryType = { ...Basic };
UncheckedHasError.decorators = [ withVariants ];
UncheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-checkbox--has-error`,
    modelValue: false,
  })) ],
};

export const Checked: StoryObj = { ...Basic };
Checked.decorators = [ withVariants ];
Checked.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    modelValue: true,
  })) ],
};

export const CheckedHasError: CheckboxStoryType = { ...Basic };
CheckedHasError.decorators = [ withVariants ];
CheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-checkbox--has-error`,
    modelValue: true,
  })) ],
};

export const PrymitiveTypes: CheckboxStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { GroupStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes);
        return { attrs };
      },
      template: '<GroupStories v-bind="{...attrs}"/>',
    };
  },
};
PrymitiveTypes.args = {
  modelValue: [ 'Europe' ],
  items: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};
PrymitiveTypes.argTypes = { items: { table: { category: 'stories controls' } } };
PrymitiveTypes.decorators = [ withVModel ];
PrymitiveTypes.parameters = {
  chromatic: { disableSnapshot: false },
  controls: { exclude: [ 'content' ] },
};

export const Objets: CheckboxStoryType = { ...PrymitiveTypes };
Objets.args = {
  modelValue: [ {
    id: 'russia-kazakhstan-mongolia',
    label: 'Russia, Kazakhstan or Mongolia',
  } ],
  items: [
    {
      id: 'russia-kazakhstan-mongolia',
      label: 'Russia, Kazakhstan or Mongolia',
    },
    {
      id: 'asia-excluding-middle-east-russia-mongolia-and-kazakhstan',
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    },
    {
      id: 'europe',
      label: 'Europe',
    },
  ],
};

export const NestedObjets: CheckboxStoryType = { ...PrymitiveTypes };
NestedObjets.args = {
  modelValue: [ {
    id: 'asia-excluding-middle-east-russia-mongolia-and-kazakhstan',
    label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    inputAttrs: { 'data-testid': 'input-asia-excluding-middle-east-russia-mongolia-and-kazakhstan' },
  } ],
  items: [
    {
      id: 'russia-kazakhstan-mongolia',
      label: 'Russia, Kazakhstan or Mongolia',
      inputAttrs: { 'data-testid': 'input-russia-kazakhstan-mongolia' },
    },
    {
      id: 'asia-excluding-middle-east-russia-mongolia-and-kazakhstan',
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      inputAttrs: { 'data-testid': 'input-asia-excluding-middle-east-russia-mongolia-and-kazakhstan' },
    },
    {
      id: 'europe',
      label: 'Europe',
      inputAttrs: { 'data-testid': 'input-europe' },
    },
  ],
};
