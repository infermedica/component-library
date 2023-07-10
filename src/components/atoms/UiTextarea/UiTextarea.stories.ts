import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  ref,
  provide,
  inject,
} from 'vue';
import deepmerge from 'deepmerge';
import { UiTextarea } from '@/../index';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';

const { argTypes } = useArgTypes(deepmerge(
  UiTextarea,
  inputEvents,
));
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const meta = {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    modifiers: [],
    modelValue: '',
    resize: false,
    placeholder: 'Please provide a detailed description of the issue.',
    disabled: false,
    textareaAttrs: { 'data-testid': 'textarea-element' },
  },
  argTypes: {
    ...argTypes,
    resize: {
      control: 'select',
      options: [
        true,
        false,
        'horizontal',
        'vertical',
      ],
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiTextarea>;
export default meta;
type Story = StoryObj<typeof UiTextarea>;

export const Basic: Story = { render: () => BasicStories };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: BasicStoriesSource } },
};

export const Empty: Story = { ...Basic };
Empty.argTypes = {
  modelValue: { control: false },
  placeholder: { control: 'text' },
  disabled: { control: false },
};
Empty.decorators = [
  withVariants,
  () => ({
    setup(props, { attrs }) {
      const {
        modelValue, ...args
      } = attrs;
      const value = ref(modelValue);
      provide('value', value);
    },
    template: '<story />',
  }),
];
Empty.parameters = {
  variants: [
    { label: 'default' },
    ...[
      'hover',
      'focus-within',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-textarea--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Filled: Story = { ...Empty };
Filled.args = { modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.' };
Filled.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: 'text' },
  placeholder: { control: false },
};

export const WithError: Story = { ...Basic };
WithError.argTypes = {
  modelValue: { control: false },
  placeholder: { control: false },
};
WithError.decorators = [ withVariants ];
WithError.parameters = {
  ...Empty.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-textarea--has-error',
    },
    ...[ 'hover' ].map((variant) => ({
      label: `${variant}`,
      class: `ui-textarea--has-error pseudo-${variant}`,
    })),
    {
      label: 'filed',
      class: 'ui-textarea--has-error',
      modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error.',
    },
  ],
};
