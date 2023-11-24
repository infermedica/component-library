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
  GroupStories,
  GroupStoriesSource,
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
  modelValue: [ 'I have hypertension' ],
  items: [
    'I have diabetes',
    'I’m overweight or obese',
    'I have hypertension',
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
