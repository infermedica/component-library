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
