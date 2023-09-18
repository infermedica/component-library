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
    modelValue: false,
    content: 'I’m overweight or obese',
    class: [],
    value: 'overweight-or-obese',
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
    modelValue: { control: 'text' },
    value: { control: 'text' },
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = { render: () => (BasicStories) };
Basic.decorators = [ withVModel ];
Basic.parameters = {
  docs: { source: { code: BasicStoriesSource } },
  chromatic: { disableSnapshot: true },
};

export const Unchecked: StoryObj = { render: () => (BasicStories) };
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
  ],
};

export const Checked: StoryObj = { render: () => (BasicStories) };
Checked.decorators = [ withVariants ];
Checked.parameters = {
  variants: [
    {
      label: 'default',
      modelValue: 'overweight-or-obese',
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: 'overweight-or-obese',
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: 'overweight-or-obese',
    },
  ],
};
