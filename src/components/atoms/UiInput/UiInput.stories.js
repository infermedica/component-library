import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  modifiers,
  placeholder,
} from '@sb/helpers/argTypes';
import icons from '@/components/atoms/UiIcon/icons.ts';
import { keyboardFocus } from '../../../utilities/directives';

const events = actions({
  onClick: 'onClick',
  onUpdateModelValue: 'update:modelValue',
});

export default {
  title: 'Atoms/Input',
  component: UiInput,
  subcomponents: {
    UiText,
  },
  args: {
    initModelValue: '',
    type: 'text',
    modifiers: [],
    placeholder: 'Put your height',
    suffix: '',
    textSuffixAttrs: {
      'data-testid': 'text-suffix',
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    type: {
      description: 'Use this control to set input type.',
      table: {
        category: 'stories controls',
      },
      control: 'select',
      options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'],
    },
    modifiers: modifiers({
      options: [
        'ui-input--is-disabled',
        'ui-input--has-error',
        'ui-input--has-icon',
      ],
    }),
    placeholder,
    modelValue: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiInput,
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
    :text-suffix-attrs="textSuffixAttrs"
    :type="type"
    :class="modifiers"
    :placeholder="placeholder"
    @update:modelValue="onUpdateModelValue"
  />`,
});

export const WithPlaceholder = Template.bind({
});

export const WithValue = Template.bind({
});
WithValue.args = {
  initModelValue: 'Input text',
};

export const HasError = Template.bind({
});
HasError.args = {
  modifiers: ['ui-input--has-error'],
};

export const IsDisabled = Template.bind({
});
IsDisabled.args = {
  modifiers: ['ui-input--is-disabled'],
};

export const WithSuffix = Template.bind({
});
WithSuffix.args = {
  suffix: 'Suffix',
};

export const WithAButtonInSuffix = (args) => ({
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
    :text-suffix-attrs="textSuffixAttrs"
    :type="type"
    :class="modifiers"
    :placeholder="placeholder"
    @update:modelValue="onUpdateModelValue"
  >
    <template #aside="{
      suffix, 
      attrs
    }">
      <UiButton 
        class="ui-button--icon ui-input__aside"
        @click="onClick"
      >
        <UiIcon
          :icon="icon"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiInput>`,
});
WithAButtonInSuffix.args = {
  icon: 'search',
  modifiers: ['ui-input--has-icon'],
};
WithAButtonInSuffix.argTypes = {
  icon: {
    control: {
      type: 'select',
    },
    options: icons,
  },
};

export const WithInputSlot = (args) => ({
  components: {
    UiInput,
    UiIcon,
  },
  directives: {
    keyboardFocus,
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
    :text-suffix-attrs="textSuffixAttrs"
    :type="type"
    :class="modifiers"
    :placeholder="placeholder"
    @update:modelValue="onUpdateModelValue"
  >
    <template #input="{
      attrs, 
      input, 
      value, 
      validation
    }">
      <input
        v-keyboard-focus
        v-bind="attrs"
        :value="value"
        class="ui-input__input"
        @keydown="validation"
        @input="input($event.target.value)"
      >
    </template>
  </UiInput>`,
});

export const WithAsideSlot = (args) => ({
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
      :text-suffix-attrs="textSuffixAttrs"
      :type="type"
      :class="modifiers"
      :placeholder="placeholder"
      @update:modelValue="onUpdateModelValue"
  >
    <template #aside="{
      suffix,
      attrs
    }">
      <UiText
        v-bind="attrs"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </template>
  </UiInput>`,
});
WithAsideSlot.args = {
  suffix: 'Suffix',
};
