import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import icons from '@/components/atoms/UiIcon/icons';

import { ref } from 'vue';

export default {
  title: 'Atoms/Input',
  component: UiInput,
  subcomponents: { UiText },
  args: {
    modelValue: '',
    suffix: '',
    placeholder: 'Put your height',
  },
  argTypes: {
    modelValue: {
      control: false,
    },
    disabled: {
      control: { type: 'boolean' },
      table: {
        category: 'HTML attributes',
      },
    },
    modifiers: {
      control: {
        type: 'multi-select',
        options: [
          'ui-input--is-disabled',
          'ui-input--has-error',
          'ui-input--has-icon',
        ],
      },
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiInput },
  setup() {
    const modelValue = ref('');
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
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: 'cm',
};

export const WithIconAsSuffix = (args) => ({
  components: { UiInput, UiIcon },
  setup() {
    const modelValue = ref('');
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
      options: icons,
    },
  },
};

export const WithInputSlot = (args) => ({
  components: { UiInput, UiIcon },
  setup() {
    const modelValue = ref('');
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
  components: { UiInput, UiIcon },
  setup() {
    const modelValue = ref('');
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
      <UiText class="ui-input__aside">
        {{ suffix }}
      </UiText>
    </template>
  </UiInput>`,
});
WithAsideSlot.args = {
  suffix: 'cm',
};
