import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import { modifiers } from '@sb/helpers/argTypes';
import icons from '@/components/atoms/UiIcon/icons';
import { keyboardFocus } from '../../../utilities/directives';

const events = actions({
  onClick: 'onClick',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
  onUpdateModelValue: 'update:modelValue',
});

export default {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    initModelValue: '',
    type: 'text',
    modifiers: [],
    placeholder: 'Put your height',
    disabled: false,
    suffix: '',
    inputAttrs: { 'data-testid': 'input-element' },
    textSuffixAttrs: { 'data-testid': 'text-suffix' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    type: {
      description: 'Use this control to set input type.',
      table: { category: 'stories controls' },
      control: 'select',
      options: [
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'url',
      ],
    },
    modifiers: modifiers({
      options: [
        'ui-input--is-disabled',
        'ui-input--has-error',
        'ui-input--has-icon',
      ],
    }),
    modelValue: { control: false },
    inputAttrs: { table: { subcategory: 'Attrs props' } },
    textSuffixAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--input-border-start-start-radius': 'var(--border-radius-form)',
      '--input-border-start-end-radius': 'var(--border-radius-form)',
      '--input-border-end-start-radius': 'var(--border-radius-form)',
      '--input-border-end-end-radius': 'var(--border-radius-form)',
      '--input-transition': 'border-color 150ms ease-in-out',
      '--input-border-block':
        'var(--input-border-block-start, var(--input-border)) var(--input-border-block-end, var(--input-border))',
      '--input-border-inline':
        'var(--input-border-inline-start, var(--input-border)) var(--input-border-inline-end, var(--input-border))',
      '--input-border-block-style':
        'var(--input-border-block-start-style, solid) var(--input-border-block-end-style, solid)',
      '--input-border-inline-style':
        'var(--input-border-inline-start-style, solid) var(--input-border-inline-end-style, solid)',
      '--input-border-block-color':
        'var(--input-border-block-start-color, var(--color-border-strong)) var(--input-border-block-end-color, var(--color-border-strong))',
      '--input-border-inline-color':
        'var(--input-border-inline-start-color, var(--color-border-strong)) var(--input-border-inline-end-color, var(--color-border-strong))',
      '--input-border-block-width':
        'var(--input-border-block-start-width, 0) var(--input-border-block-end-width, 0)',
      '--input-border-inline-width':
        'var(--input-border-inline-start-width, 0) var(--input-border-inline-end-width, 0)',
      '--input-hover-border-block-color':
        'var(--input-hover-border-block-start-color, var(--color-border-strong-hover)) var(--input-hover-border-block-end-color, var(--color-border-strong-hover))',
      '--input-hover-border-inline-color':
        'var(--input-hover-border-inline-start-color, var(--color-border-strong-hover)) var(--input-hover-border-inline-end-color, var(--color-border-strong-hover))',
      '--input-font': 'var(--font-body-1)',
      '--input-letter-spacing': 'var(--letter-spacing-body-1)',
      '--input-padding-block':
        'var(--input-padding-block-start, var(--space-12)) var(--input-padding-block-end, var(--space-12))',
      '--input-padding-inline':
        'var(--input-padding-inline-start, var(--space-16)) var(--input-padding-inline-end, var(--space-16))',
      '--input-caret-color': 'var(--color-gray-400)',
      '--input-color': 'var(--color-text-disabled)',
      '--input-placeholder-color': 'var(--color-text-disabled)',
      '--input-aside-margin-block':
        'var(--input-aside-margin-block-start, 0) var(--input-aside-margin-block-end, 0)',
      '--input-aside-margin-inline':
        'var(--input-aside-margin-inline-start, calc(var(--space-4) * -1)) var(--input-aside-margin-inline-end, var(--space-12))',
      '--input-border-color': 'var(--color-border-error-strong)',
      '--input-aside-color': 'var(--color-text-disabled)',
      '--input-hover-border-color': 'var(--color-border-error-strong-hover)',
    },
  },
};

export const WithPlaceholder = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    />`,
  }),
};

export const WithValue = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    />`,
  }),

  args: { initModelValue: 'Input text' },
};

export const HasError = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    />`,
  }),

  args: { modifiers: [ 'ui-input--has-error' ] },
};

export const IsDisabled = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    />`,
  }),

  args: { modifiers: [ 'ui-input--is-disabled' ] },
};

export const WithSuffix = {
  render: (args) => ({
    components: { UiInput },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    />`,
  }),

  args: { suffix: 'Suffix' },
};

export const WithAButtonInSuffix = {
  render: (args) => ({
    components: {
      UiInput,
      UiButton,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #aside="{
        suffix,
        attrs
      }">
        <UiButton
          class="ui-button--icon ui-input__aside"
          aria-label="Search"
          @click="onClick"
        >
          <UiIcon
            :icon="icon"
            class="ui-button__icon"
          />
        </UiButton>
      </template>
    </UiInput>`,
  }),

  args: {
    icon: 'search',
    modifiers: [ 'ui-input--has-icon' ],
  },

  argTypes: {
    icon: {
      control: { type: 'select' },
      options: icons,
    },
  },
};

export const WithInputSlot = {
  render: (args) => ({
    components: {
      UiInput,
      UiIcon,
    },
    directives: { keyboardFocus },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #input="{
        inputAttrs,
        input,
        value,
        validation
      }">
        <input
          v-keyboard-focus
          v-bind="inputAttrs"
          :value="value"
          class="ui-input__input"
          @keydown="validation"
          @input="input($event.target.value)"
        />
      </template>
    </UiInput>`,
  }),
};

export const WithAsideSlot = {
  render: (args) => ({
    components: {
      UiInput,
      UiIcon,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initial);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiInput
      v-model="modelValue"
      :suffix="suffix"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      :disabled="disabled"
      :text-suffix-attrs="textSuffixAttrs"
      :input-attrs="inputAttrs"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #aside="{
        suffix,
        textSuffixAttrs
      }">
        <UiText
          v-bind="textSuffixAttrs"
          class="ui-input__aside"
        >
          {{ suffix }}
        </UiText>
      </template>
    </UiInput>`,
  }),

  args: { suffix: 'Suffix' },
};
