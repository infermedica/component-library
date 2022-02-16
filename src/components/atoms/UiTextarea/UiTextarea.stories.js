import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';

import { ref } from 'vue';

export default {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    placeholder: 'I still don’t know what should I do',
    resize: true,
    modelValue: '',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: {
      control: { type: 'boolean' },
      table: {
        category: 'HTML attributes',
      },
    },
    resize: { control: { type: 'select', options: [true, false, 'horizontal', 'vertical'] } },
    modifiers: {
      control: {
        type: 'multi-select',
        options: [
          'ui-textarea--is-disabled',
          'ui-textarea--has-error',
        ],
      },
      table: {
        category: 'HTML attributes',
      },
    },
  },
  parameters: {
    cssprops: {
      'textarea-padding': {
        value: 'var(--space-12) var(--space-16)',
        control: 'text',
        description: '',
      },
      'textarea-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'textarea-background-color': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'textarea-border': {
        value: 'solid var(--textarea-border-color, var(--color-border-strong))',
        control: 'text',
        description: '',
      },
      'textarea-border-width': {
        value: '1px',
        control: 'text',
        description: '',
      },
      'textarea-border-radius': {
        value: 'var(--border-radius-form)',
        control: 'text',
        description: '',
      },
      'textarea-placeholder-color': {
        value: 'var(--color-text-dimmed)',
        control: 'text',
        description: '',
      },
      'textarea-hover-border-color': {
        value: 'var(--color-border-strong-hover)',
        control: 'text',
        description: '',
      },
      'textarea-focus-border-color': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'textarea-error-placeholder-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'textarea-error-border-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'textarea-error-hover-border-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'textarea-disabled-color': {
        value: 'var(--color-text-disabled)',
        control: 'text',
        description: '',
      },
      'textarea-disabled-placeholder-color': {
        value: 'var(--color-text-disabled)',
        control: 'text',
        description: '',
      },
      'textarea-disabled-border-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
      'textarea-disabled-hover-border-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
      'textarea-disabled-caret-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTextarea },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
  },
  template: `<UiTextarea
    v-model="modelValue"
    :resize="resize"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="modifiers"
  />`,
});

export const WithPlaceholder = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: 'ui-textarea--is-disabled',
};

export const HasError = Template.bind({});
HasError.args = {
  modifiers: 'ui-textarea--has-error',
};
