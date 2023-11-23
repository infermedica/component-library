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
import {
  BasicStories,
  BasicStoriesSource,
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

console.log(args);

const meta = {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  args: {
    content: 'I read and accept Terms of Service and Privacy Policy.',
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
  ],
};

export const Checked: StoryObj = { ...Basic };
Checked.decorators = [ withVariants ];
Checked.parameters = {
  variants: [
    {
      label: 'default',
      modelValue: true,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: true,
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: true,
    },
  ],
};
