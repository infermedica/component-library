import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';
import {
  nextTick,
  onMounted,
  ref,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import { modifiers } from '@sb/helpers/argTypes';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

export default {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    initModelValue: '',
    modifiers: [],
    placeholder: 'I still don’t know what should I do',
    disabled: false,
    resize: true,
    /**
     * Use this props to pass attrs for input element.
     */
    textareaAttrs: { 'data-testid': 'textarea-element' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: { type: 'text' },
    },
    modifiers: modifiers({
      options: [
        'ui-textarea--is-disabled',
        'ui-textarea--has-error',
      ],
    }),
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
};

const Template = (args) => ({
  components: { UiTextarea },
  setup() {
    const modelValue = ref(args.initModelValue);
    const element = ref(null);
    onMounted(async () => {
      await nextTick();
      element.value?.$el.querySelector('textarea').focus();
    });
    return {
      ...args,
      ...events,
      modelValue,
      element,
    };
  },
  template: `<UiTextarea
    ref="element"
    v-model="modelValue"
    :resize="resize"
    :placeholder="placeholder"
    :disabled="disabled"
    :textarea-attrs="textareaAttrs"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
    @focus="onFocus"
    @blur="onBlur"
  />`,
});

export const WithPlaceholder = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = { modifiers: 'ui-textarea--is-disabled' };

export const HasError = Template.bind({});
HasError.args = { modifiers: 'ui-textarea--has-error' };
