import type {
  Meta,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';
import {
  ref,
  provide,
  inject,
} from 'vue';
import deepmerge from 'deepmerge';
import {
  UiInput,
  UiButton,
  UiIcon,
  UiText,
} from '@index';
import type { InputProps } from '@index';
import { keyboardFocus } from '@/utilities/directives';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';
import { icon as iconArgsType } from '@sb/helpers/argTypes/index';
import {
  userEvent,
  within,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { PlayFunctionContext } from '@storybook/types';
import {
  getStyleTests,
  getCSSValue,
} from '@tests/interactions/helpers';
import type { Icon } from '@/types';

type InputArgsType = InputProps & {
  modifiers?: string[];
  outline?: unknown;
  icon?: Icon;
}
type InputMetaType = Meta<InputArgsType>;
type InputStoryType = StoryObj<InputArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, InputArgsType>;

const getStatesTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const inputs = [ ...canvasElement.querySelectorAll('.ui-input') ];
  await step('Correct border colors', () => {
    getStyleTests(inputs, 'borderColor', results, 'after');
  });
};

const { argTypes } = useArgTypes(
  deepmerge(UiInput, inputEvents),
  { variables: { regexp: /^(\.ui-input|\.ui-input__input)$/ } },
);

const UiInputButtonAside = {
  components: {
    UiButton,
    UiIcon,
  },
  props: [ 'icon' ],
  template: `<UiButton class="ui-button--icon">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`,
};

const meta = {
  title: 'Atoms/Input',
  component: UiInput,
  args: {
    modifiers: [],
    modelValue: '',
    placeholder: 'Search, e.g. headache',
    type: 'text',
    disabled: false,
    suffix: '',
    textSuffixAttrs: { 'data-testid': 'text-suffix' },
    inputAttrs: { 'data-testid': 'input-element' },
    outline: { 'data-testid': 'outline-element' },
  },
  argTypes: {
    ...argTypes,
    icon: iconArgsType,
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
    docs: { source: { code: null } },
  },
} satisfies InputMetaType;
export default meta;

export const Basic: InputStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiInput },
    setup(props, { attrs }) {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = inject('value') || ref(modelValue);
      return {
        args: {
          ...args,
          class: modifiers,
        },
        value,
      };
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    />`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
    :text-suffix-attrs="textSuffixAttrs"
    :input-attrs="inputAttrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiInput } from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
const textSuffixAttrs = {
  "data-testid": "text-suffix"
};
const inputAttrs = {
  "data-testid": "input-element"
};
</script>"`,
    },
  },
};

export const Empty: InputStoryType = { ...Basic };
Empty.argTypes = {
  modelValue: { control: false },
  placeholder: { control: 'text' },
  disabled: { control: false },
};
Empty.decorators = [
  withVariants,
  () => ({
    inheritAttrs: false,
    setup(props, { attrs }) {
      const { modelValue } = attrs;
      const value = ref(modelValue);
      provide('value', value);
    },
    template: '<story />',
  }),
];
Empty.parameters = {
  variants: [
    { label: 'default' },
    {
      label: 'hover',
      class: 'pseudo-hover',
    },
    {
      label: 'focus',
      outlineAttrs: { class: 'pseudo-focus-within' },
    },
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-input--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Filled: InputStoryType = { ...Empty };
Filled.args = { modelValue: 'headache' };
Filled.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: 'text' },
  placeholder: { control: false },
};
Filled.play = async ({
  canvasElement, step,
}) => {
  const canvas = within(canvasElement);
  const inputs = canvas.getAllByTestId<HTMLInputElement>('input-element');
  inputs[0].value = '';
  await step('Correct value of filled input', async () => {
    await userEvent.type(inputs[0], 'headache', { delay: 150 });
    expect(inputs[0].value).toBe('headache');
  });
};

export const WithError: InputStoryType = { ...Basic };
WithError.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: false },
  placeholder: { control: false },
};
WithError.decorators = [ withVariants ];
WithError.parameters = {
  ...Empty.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-input--has-error',
    },
    ...[ 'hover' ].map((variant) => ({
      label: `${variant}`,
      class: `ui-input--has-error pseudo-${variant}`,
    })),
    {
      label: 'focus',
      class: 'ui-input--has-error',
      outlineAttrs: { class: 'pseudo-focus-within' },
    },
    {
      label: 'disabled',
      class: 'ui-input--has-error ui-input--is-disabled',
    },
  ],
};
WithError.play = async (context) => getStatesTests(context, [
  '',
  '-hover',
  '',
  '',
].map((state) => ({ borderColor: getCSSValue(`--color-border-error-strong${state}`) })));

export const WithSuffix: InputStoryType = { ...Basic };
WithSuffix.args = {
  placeholder: 'Put your height',
  suffix: 'cm',
};
WithSuffix.parameters = { docs: { source: { code: null } } };
export const WithButtonAside: InputStoryType = {
  render: () => ({
    components: {
      UiInput,
      UiInputButtonAside,
    },
    setup: (props, { attrs }) => {
      const {
        icon,
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);
      return {
        icon,
        args: {
          ...args,
          class: modifiers,
        },
        value,
      };
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #aside>
        <UiInputButtonAside
          :icon="icon"
          class="ui-input__aside"
        />
      </template>
    </UiInput>`,
  }),
};
WithButtonAside.argTypes = {
  suffix: { control: false },
  textSuffixAttrs: { control: false },
};
WithButtonAside.args = { icon: 'search' };
WithButtonAside.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiInput
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
  >
    <template #aside>
      <UiButton class="ui-button--icon">
        <UiIcon
          icon="search"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiInput,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
</script>"`,
    },
  },
};

export const WithInputSlot: InputStoryType = {
  render: () => ({
    inheritAttrs: false,
    directives: { keyboardFocus },
    components: { UiInput },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args: {
          ...args,
          class: modifiers,
        },
        value,
      };
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #input="{
        inputAttrs,
        input,
        value,
        validation
      }">
        <input
          ref="input"
          v-keyboard-focus
          v-bind="inputAttrs"
          :value="value"
          class="ui-input__input"
          @keydown="validation"
          @input="input($event)"
        >
      </template>
    </UiInput>`,
  }),
};
WithInputSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
    :input-attrs="inputAttrs"
  >
    <template #input="{
      inputAttrs,
      input,
      value,
      validation
    }">
      <input
        ref="input"
        v-keyboard-focus
        v-bind="inputAttrs"
        :value="value"
        class="ui-input__input"
        @keydown="validation"
        @input="input($event)"
      >
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiInput } from '@infermedica/component-library';
import { keyboardFocus as vKeyboardFocus } from '@infermedica/component-library/directives'

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
const inputAttrs = {
  "data-testid": "input-element"
}
</script>"`,
    },
  },
};

export const WithAsideSlot: InputStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiInput,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        modifiers = {},
        ...args
      } = attrs;
      const value = ref(modelValue);

      return {
        args: {
          ...args,
          class: modifiers,
        },
        value,
      };
    },
    template: `<UiInput
      v-model="value"
      v-bind="args"
    >
      <template #input="{
        suffix,
        textSuffixAttrs
      }">
        <UiText
          v-if="suffix"
          v-bind="textSuffixAttrs"
          class="ui-input__aside"
        >{{ suffix }}</UiText>
      </template>
    </UiInput>`,
  }),
};
WithAsideSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiInput
    v-model="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :suffix="suffix"
  >
    <template #aside="{
      suffix,
      textSuffixAttrs,
    }">
      <UiText
        v-if="suffix"
        v-bind="textSuffixAttrs"
        class="ui-input__aside"
      >
        {{ suffix }}
      </UiText>
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiInput,
  UiText
} from '@infermedica/component-library';

const modelValue = ref('');
const placeholder = 'Search, e.g. headache';
const type = "text";
const disabled = false;
const suffix = '';
</script>"`,
    },
  },
};
