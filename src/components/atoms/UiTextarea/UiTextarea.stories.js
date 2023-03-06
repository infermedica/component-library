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
  parameters: {
    cssProperties: {
      '--textarea-border-start-start-radius': 'var(--border-radius-form)',
      '--textarea-border-start-end-radius': 'var(--border-radius-form)',
      '--textarea-border-end-start-radius': 'var(--border-radius-form)',
      '--textarea-border-end-end-radius': 'var(--border-radius-form)',
      '--textarea-transition': 'border-color 150ms ease-in-out',
      '--textarea-border-block':
        'var(--textarea-border-block-start, 0) var(--textarea-border-block-end, 0)',
      '--textarea-border-inline':
        'var(--textarea-border-inline-start, 0) var(--textarea-border-inline-end, 0)',
      '--textarea-border-block-style':
        'var(--textarea-border-block-start-style, solid) var(--textarea-border-block-end-style, solid)',
      '--textarea-border-inline-style':
        'var(--textarea-border-inline-start-style, solid) var(--textarea-border-inline-end-style, solid)',
      '--textarea-border-block-color':
        'var(--textarea-border-block-start-color, var(--color-border-error-strong)) var(--textarea-border-block-end-color, var(--color-border-error-strong))',
      '--textarea-border-inline-color':
        'var(--textarea-border-inline-start-color, var(--color-border-error-strong)) var(--textarea-border-inline-end-color, var(--color-border-error-strong))',
      '--textarea-border-block-width':
        'var(--textarea-border-block-start-width, 1px) var(--textarea-border-block-end-width, 1px)',
      '--textarea-border-inline-width':
        'var(--textarea-border-inline-start-width, 1px) var(--textarea-border-inline-end-width, 1px)',
      '--textarea-hover-border-block-color':
        'var(--textarea-hover-border-block-start-color, var(--color-border-error-strong-hover)) var(--textarea-hover-border-block-end-color, var(--color-border-error-strong-hover))',
      '--textarea-hover-border-inline-color':
        'var(--textarea-hover-border-inline-start-color, var(--color-border-error-strong-hover)) var(--textarea-hover-border-inline-end-color, var(--color-border-error-strong-hover))',
      '--textarea-font': 'var(--font-body-1)',
      '--textarea-letter-spacing': 'var(--letter-spacing-body-1)',
      '--textarea-padding-block':
        'var(--textarea-padding-block-start, var(--space-12)) var(--textarea-padding-block-end, var(--space-12))',
      '--textarea-padding-inline':
        'var(--textarea-padding-inline-start, var(--space-16)) var(--textarea-padding-inline-end, var(--space-16))',
      '--textarea-caret-color': 'var(--color-gray-400)',
      '--textarea-color': 'var(--color-text-disabled)',
      '--textarea-placeholder-color': 'var(--color-text-disabled)',
    },
  },
};

export const WithPlaceholder = {
  render: (args) => ({
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
  }),
};

export const IsDisabled = {
  render: (args) => ({
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
  }),

  args: { modifiers: 'ui-textarea--is-disabled' },
};

export const HasError = {
  render: (args) => ({
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
  }),

  args: { modifiers: 'ui-textarea--has-error' },
};
