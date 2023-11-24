import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiCheckbox } from '@index';
import type { CheckboxProps } from '@index';
import {
  withVariants,
  withVModel,
} from '@sb/decorators';
import { getArgTypes } from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index';
import { useAttrs } from '@sb/composable';
import { Empty } from '@/components/atoms/UiInput/UiInput.stories';
import {
  BasicStories,
  BasicStoriesSource,
  GroupStories,
  GroupStoriesSource,
} from './stories';

type CheckboxArgsType = CheckboxProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<CheckboxProps['value']>[];
}
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

export const UncheckedHasError: StoryObj = { ...Basic };
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

export const CheckedHasError: StoryObj = { ...Basic };
CheckedHasError.decorators = [ withVariants ];
CheckedHasError.parameters = {
  variants: [ ...Unchecked.parameters.variants.map((variant) => ({
    ...variant,
    class: `${variant.class} ui-checkbox--has-error`,
    modelValue: true,
  })) ],
};

export const PrymitiveTypes: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { GroupStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<GroupStories v-bind="{...args, ...attrs}"/>',
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
PrymitiveTypes.parameters = { controls: { exclude: [ 'content' ] } };

export const Objets: StoryObj = { ...PrymitiveTypes };
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

export const NestedObjets: StoryObj = { ...PrymitiveTypes };
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
