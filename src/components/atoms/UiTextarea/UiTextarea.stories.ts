import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiTextarea } from '@/../index';
import { withVariants } from '@sb/decorators';

const meta = {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    modelValue: '',
    resize: false,
    placeholder: 'Please provide a detailed description of the issue.',
    disabled: false,
    textareaAttrs: { 'data-test': 'textarea-element' },
  },
  argTypes: {
    modelValue: { control: 'text' },
    resize: {
      control: 'select',
      options: [
        true,
        false,
        'horizontal',
        'vertical',
      ],
    },
    'update:modelValue': { control: false },
    onFocus: {
      action: 'onFocus',
      table: { disable: true },
    },
    onBlur: {
      action: 'onBlur',
      table: { disable: true },
    },
  },
} satisfies Meta<typeof UiTextarea>;
export default meta;
type Story = StoryObj<typeof UiTextarea>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiTextarea },
    props: Object.keys(args),
    template: '<UiTextarea v-bind="$props"/>',
  }),
};

export const WithModelValue: Story = { ...Basic };
WithModelValue.args = { modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.' };

export const WithPlaceholder: Story = { ...Basic };
WithPlaceholder.args = { placeholder: 'Please provide a detailed description of the issue' };

export const WithDisabled: Story = { ...Basic };
WithDisabled.args = { disabled: true };

export const WithResize: Story = { ...Basic };
WithResize.args = { resize: true };

const StateTemplate: Story = { ...Basic }
StateTemplate.argTypes = {
  disabled: {
    control: false,
  }
}
StateTemplate.decorators = [ withVariants ]
StateTemplate.parameters = {
  variants: [
    { label: 'default' },
    ...['hover', 'focus'].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-textarea--is-disabled'
    }
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
}

export const Empty: Story = {...StateTemplate};

export const Filled: Story = { ...Empty };
Filled.args = { modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.' };

export const WithError: Story = { ...Basic };
WithError.decorators = [ withVariants ]
WithError.parameters = {
  ...StateTemplate.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-textarea--has-error'
    },
    ...['hover'].map((variant) => ({
      label: `${variant}`,
      class: `ui-textarea--has-error pseudo-${variant}`,
    })),
    {
      label: 'filed',
      class: 'ui-textarea--has-error',
      modelValue: '\'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.'
    }
  ]
}
