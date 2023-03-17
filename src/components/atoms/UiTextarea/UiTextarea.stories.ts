import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiTextarea } from '@/../index';

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
WithPlaceholder.args = { placeholder: 'Please provide a detailed description of the issue ' };

export const WithDisabled: Story = { ...Basic };
WithDisabled.args = { disabled: true };

export const WithResize: Story = { ...Basic };
WithResize.args = { resize: true };

export const Empty: Story = {
  render: (args) => ({
    components: { UiTextarea },
    props: Object.keys(args),
    template: `<UiTextarea v-bind="$props"/>
    <UiTextarea 
      v-bind="$props"
      :disabled="true"
      class="ui-textarea--is-disabled"
    />`,
  }),
};
Empty.args = { placeholder: 'Please provide a detailed description of the issue.' };
Empty.decorators = [ () => ({ template: '<div class="grid gap-2"><story/></div>' }) ];
Empty.parameters = {
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Filled: Story = { ...Empty };
Filled.args = { modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.' };

// TODO: story for hover and focus?

export const WithError: Story = {
  render: (args) => ({
    components: { UiTextarea },
    props: Object.keys(args),
    template: `<UiTextarea 
      v-bind="$props"
      modelValue=""
      class="ui-textarea--has-error"
    />
    <UiTextarea 
      v-bind="$props"
      class="ui-textarea--has-error"
    />`,
  }),
};
WithError.args = {
  modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.',
  placeholder: 'Please provide a detailed description of the issue ',
};
WithError.decorators = [ () => ({ template: '<div class="grid gap-2"><story/></div>' }) ];
WithError.parameters = { ...Empty.parameters };
