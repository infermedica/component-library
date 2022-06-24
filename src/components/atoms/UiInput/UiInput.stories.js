import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import icons from '@/components/atoms/UiIcon/icons';
import { ref } from 'vue';
import { modifiers, placeholder, disabled } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Input',
  component: UiInput,
  subcomponents: { UiText },
  args: {
    initModelValue: '',
    modifiers: [],
    placeholder: 'Put your height',
    disabled: false,
    suffix: '',
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    modifiers: modifiers({
      options: [
        'ui-input--is-disabled',
        'ui-input--has-error',
        'ui-input--has-icon',
      ],
    }),
    disabled,
    placeholder,
    modelValue: {
      control: false,
    },
  },
  parameters: {
    cssprops: {
      'input-border-radius': {
        value: 'var(--border-radius-form)',
        control: 'text',
        description: '',
      },
      'input-background-color': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'input-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'input-border': {
        value: 'var(--input-border-style, solid) var(--input-border-color, var(--color-border-strong))',
        control: 'text',
        description: '',
      },
      'input-border-width': {
        value: '1px',
        control: 'text',
        description: '',
      },
      'input-focus-border-color': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'input-hover-border-color': {
        value: 'var(--color-border-strong-hover)',
        control: 'text',
        description: '',
      },
      'input-padding': {
        value: 'var(--space-12) var(--space-16)',
        control: 'text',
        description: '',
      },
      'input-caret-color': {
        value: 'var(--color-blue-500)',
        control: 'text',
        description: '',
      },
      'input-placeholder-color': {
        value: 'var(--color-text-dimmed)',
        control: 'text',
        description: '',
      },
      'input-aside-font': {
        value: 'var(--font-body-1)',
        control: 'text',
        description: '',
      },
      'input-aside-letter-spacing': {
        value: 'var(--letter-spacing-body-1)',
        control: 'text',
        description: '',
      },
      'input-aside-margin': {
        value: '0 0 0 var(--space-12)',
        control: 'text',
        description: '',
      },
      'input-suffix-color': {
        value: 'var(--input-color), var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'input-icon-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'input-error-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'input-error-border-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'input-error-hover-border-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'input-error-focus-border-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'input-error-caret-color': {
        value: 'var(--color-border-error-strong)',
        control: 'text',
        description: '',
      },
      'input-disabled-color': {
        value: 'var(--color-text-disabled)',
        control: 'text',
        description: '',
      },
      'input-disabled-border-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
      'input-disabled-hover-border-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
      'input-disabled-focus-border-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
      'input-disabled-caret-color': {
        value: 'var(--color-border-subtle)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiInput },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiInput
    v-model="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :suffix="suffix"
    :class="modifiers"
  />`,
});

export const WithPlaceholder = Template.bind({});

export const HasError = Template.bind({});
HasError.args = {
  modifiers: ['ui-input--has-error'],
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: ['ui-input--is-disabled'],
  disabled: true,
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: 'cm',
};

export const WithIconAsSuffix = (args) => ({
  components: { UiInput, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiInput
    v-model="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="modifiers"
  >
    <template #aside>
      <UiIcon 
        :icon="icon" 
        class="ui-input__aside"
      />
    </template>
  </UiInput>`,
});
WithIconAsSuffix.args = {
  icon: 'search',
  modifiers: ['ui-input--has-icon'],
};
WithIconAsSuffix.argTypes = {
  icon: {
    control: {
      type: 'select',
    },
    options: icons,
  },
};

export const WithInputSlot = (args) => ({
  components: { UiInput, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiInput
    v-model="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="modifiers"
  >
    <template #input="{attrs, input, value, validation}">
      <input
        v-bind="attrs"
        :value="value"
        class="ui-input__element"
        @keydown="validation"
        @input="input($event.target.value)"
      >
    </template>
  </UiInput>`,
});

export const WithAsideSlot = (args) => ({
  components: { UiInput, UiIcon, UiText },
  setup() {
    const modelValue = ref(args.initial);
    return { ...args, modelValue };
  },
  template: `<UiInput
    v-model="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :suffix="suffix"
    :class="modifiers"
  >
    <template #aside="{suffix}">
      <UiText
        tag="span"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </template>
  </UiInput>`,
});
WithAsideSlot.args = {
  suffix: 'cm',
};
