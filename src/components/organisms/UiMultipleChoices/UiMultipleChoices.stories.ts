import {
  inject,
  provide,
  ref,
} from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';

import {
  UiAlert,
  UiMultipleChoices,
} from '@index';
import type { MultipleChoicesProps } from '@index';

type MultipleChoicesArgsType = MultipleChoicesProps;
type MultipleChoicesMetaType = Meta<MultipleChoicesArgsType>;
type MultipleChoicesStoryType = StoryObj<MultipleChoicesArgsType>;

const events = extendEvents([
  'update:modelValue',
  'update:invalid',
]);

const { argTypes } = useArgTypes(deepmerge(UiMultipleChoices, events));

const meta = {
  title: 'Organisms/uiMultipleChoicesTS',
  component: UiMultipleChoices,
  args: {
    modelValue: [],
    items: [
      {
        label: 'I have diabetes',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'I have hypertension',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'I have high cholesterol',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
    ],
    options: [
      {
        label: 'Yes',
        value: 'present',
      },
      {
        label: 'No',
        value: 'absent',
      },
      {
        label: "Don't know",
        value: 'unknown',
      },
    ],
    hint: 'Select one answer in each row',
    touched: false,
    invalid: true,
    alertHintAttrs: { 'data-testid': 'alert-hint' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'object' },
    items: { control: 'object' },
    options: { control: 'object' },
  },
  decorators: [ () => ({
    setup(props, { attrs }) {
      const {
        modelValue,
        ...args
      } = attrs;

      provide('modelValue', ref(modelValue));
      return { args };
    },
    template: `<div>
      <story v-bind="args"/>
    </div>`,
  }) ],
} satisfies MultipleChoicesMetaType;

export default meta;

export const Basic: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiMultipleChoices },
    setup(props, { attrs }) {
      const {
        hint,
        touched,
        invalid,
        items,
        options,
        alertHintAttrs,
      } = attrs;

      const isInvalid = ref(invalid);
      const modelValue = inject('modelValue');

      return {
        modelValue,
        hint,
        touched,
        isInvalid,
        items,
        options,
        alertHintAttrs,
      };
    },
    template: `<UiMultipleChoices
      v-model="modelValue"
      v-model:invalid="isInvalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
    />`,
  }),
};

export const WithHintSlot: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      UiAlert,
    },
    setup(props, { attrs }) {
      const {
        hint,
        touched,
        invalid,
        items,
        options,
        alertHintAttrs,
      } = attrs;

      const modelValue = inject('modelValue');
      const isInvalid = ref(invalid);

      return {
        modelValue,
        hint,
        touched,
        isInvalid,
        items,
        options,
        alertHintAttrs,
      };
    },
    template: `<UiMultipleChoices
      v-model="modelValue"
      v-model:invalid="isInvalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
    >
      <template #hint="{
        hint,
        alertHintAttrs,
        hintType,
      }">
        <UiAlert
          v-if="hint"
          v-bind="alertHintAttrs"
          :type="hintType"
          class="ui-multiple-choices__hint"
        >
          {{ hint }}
        </UiAlert>
      </template>
    </UiMultipleChoices>`,
  }),
};
