import UiTextarea from '@/components/atoms/UiTextarea/UiTextarea.vue';
import {
  nextTick,
  onMounted,
  ref,
} from 'vue';
import {
  modifiers,
  placeholder,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    initModelValue: '',
    modifiers: [],
    placeholder: 'I still don’t know what should I do',
    resize: true,
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
    placeholder,
    resize: {
      control: 'select',
      options: [true, false, 'horizontal', 'vertical'],
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
      modelValue,
      element,
    };
  },
  template: `<UiTextarea
    ref="element"
    v-model="modelValue"
    :resize="resize"
    :placeholder="placeholder"
    :class="modifiers"
  />`,
});

export const WithPlaceholder = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = { modifiers: 'ui-textarea--is-disabled' };

export const HasError = Template.bind({});
HasError.args = { modifiers: 'ui-textarea--has-error' };
