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
import { UiTextarea } from '@index';
import type { TextareaProps } from '@index';
import { withVariants } from '@sb/decorators';
import {
  useArgTypes,
  inputEvents,
} from '@sb/helpers';
import { expect } from '@storybook/jest';
import {
  userEvent,
  within,
} from '@storybook/testing-library';
import type { PlayFunctionContext } from '@storybook/types';
import {
  getCSSValue,
  getStyleTests,
} from '@tests/interactions/helpers';

type TextareaArgsType = TextareaProps & {
  modifiers?: string[];
}
type TextareaMetaType = Meta<TextareaArgsType>;
type TextareaStoryType = StoryObj<TextareaArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, TextareaArgsType>;

const getStatesTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const elements = [ ...canvasElement.querySelectorAll('.ui-textarea') ];
  await step('Correct border colors', () => {
    getStyleTests(elements, 'borderColor', results, 'after');
  });
};

const { argTypes } = useArgTypes(deepmerge(
  UiTextarea,
  inputEvents,
));

const meta = {
  title: 'Atoms/Textarea',
  component: UiTextarea,
  args: {
    modifiers: [],
    modelValue: '',
    resize: false,
    placeholder: 'Please provide a detailed description of the issue.',
    disabled: false,
    textareaAttrs: { 'data-testid': 'textarea-element' },
  },
  argTypes: {
    ...argTypes,
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
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies TextareaMetaType;
export default meta;

export const Basic: TextareaStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiTextarea },
    setup(props, { attrs }) {
      const {
        modifiers,
        modelValue,
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
    template: `<UiTextarea
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
  <UiTextarea
    v-model="modelValue"
    :resize="resize"
    :placeholder="placeholder"
    :disabled="disabled"
    textarea-attrs="textareaAttrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiTextarea } from '@infermedica/component-library';

const modelValue = ref('');
const resize = false;
const placeholder = 'Please provide a detailed description of the issue.';
const disabled = false;
const textareaAttrs = {
  'data-testid': 'textarea-element'
}
</script>`,
    },
  },
};

export const Empty: TextareaStoryType = { ...Basic };
Empty.argTypes = {
  modelValue: { control: false },
  placeholder: { control: 'text' },
  disabled: { control: false },
};
Empty.decorators = [
  withVariants,
  () => ({
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
    ...[
      'hover',
      'focus-within',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
    })),
    {
      label: 'disabled',
      disabled: true,
      class: 'ui-textarea--is-disabled',
    },
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};
Empty.play = async (context) => getStatesTests(context, [
  ...[
    '',
    '-hover',
    '',
  ].map((state) => ({ borderColor: getCSSValue(`--color-border-strong${state}`) })),
  { borderColor: getCSSValue('--color-border-subtle') },
]);

export const Filled: TextareaStoryType = { ...Empty };
Filled.args = { modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error\'.' };
Filled.argTypes = {
  ...Empty.argTypes,
  modelValue: { control: 'text' },
  placeholder: { control: false },
};
Filled.play = async ({
  canvasElement, step, args: { modelValue = '' },
}) => {
  const canvas = within(canvasElement);
  const elements = canvas.getAllByTestId<HTMLInputElement>('textarea-element');
  await userEvent.clear(elements[0]);
  await step('Correct value of filled input', async () => {
    await userEvent.type(elements[0], modelValue, { delay: 20 });
    expect(elements[0].value).toBe(modelValue);
  });
};

export const WithError: TextareaStoryType = { ...Basic };
WithError.argTypes = {
  modelValue: { control: false },
  placeholder: { control: false },
};
WithError.decorators = [ withVariants ];
WithError.parameters = {
  ...Empty.parameters,
  variants: [
    {
      label: 'default',
      class: 'ui-textarea--has-error',
    },
    ...[
      'hover',
      'focus-within',
    ].map((variant) => ({
      label: `${variant}`,
      class: `ui-textarea--has-error pseudo-${variant}`,
    })),
    {
      label: 'filled',
      class: 'ui-textarea--has-error',
      modelValue: 'I encountered an error message while trying to submit a form on your website. The error message read \'500 Internal Server Error.',
    },
  ],
};
WithError.play = async (context) => getStatesTests(context, [
  '',
  '-hover',
  '',
  '',
].map((state) => ({ borderColor: getCSSValue(`--color-border-error-strong${state}`) })));
