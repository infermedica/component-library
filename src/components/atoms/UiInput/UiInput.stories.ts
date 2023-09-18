import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiInput } from '@index';
import type { InputProps } from '@index';
import { withVModel } from '@sb/decorators';
import { getArgTypes } from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type InputArgsType = InputProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<InputProps['value']>[];
}
type InputMetaType = Meta<InputArgsType>;
type InputStoryType = StoryObj<InputArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiInput);

const meta = {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    ...args,
    modelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    class: [],
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
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
