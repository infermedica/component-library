import { ref } from 'vue';
import { UiSimpleQuestion } from '@index';
import { useArgTypes } from '@sb/helpers';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import type {
  SimpleQuestionProps,
  SimpleQuestionItem,
  TileModelValue,
} from '@index';
import UiTile from '@/components/molecules/UiTile/UiTile.vue';

type SimpleQuestionArgsType = SimpleQuestionProps & {
  modelValue?: TileModelValue,
  items?: SimpleQuestionItem[],
  modifiers?: string[],
}
type SimpleQuestionMetaType = Meta<SimpleQuestionArgsType>
type SimpleQuestionStoryType = StoryObj<SimpleQuestionArgsType>

const { argTypes } = useArgTypes(UiSimpleQuestion);

const meta = {
  title: 'Organisms/UiSimpleQuestionTS',
  component: UiSimpleQuestion,
  args: {
    items: [
      {
        value: 'female',
        label: 'Female',
        icon: 'female',
        'data-testid': 'female',
        iconAttrs: { 'data-testid': 'female-icon' },
        textLabelAttrs: { 'data-testid': 'female-label' },
      },
      {
        value: 'male',
        label: 'Male',
        icon: 'male',
        iconAttrs: { 'data-testid': 'male-icon' },
        textLabelAttrs: { 'data-testid': 'male-label' },
      },
    ],
    modelValue: '',
  },
  argTypes: {
    ...argTypes,
    items: {
      control: 'object',
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
    },
  },
  decorators: [ () => ({ template: '<div class="max-w-147"><story /></div>' }) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies SimpleQuestionMetaType;

export default meta;

export const Basic: SimpleQuestionStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiSimpleQuestion },
    setup(props, { attrs }) {
      const {
        modelValue,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        current,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSimpleQuestion
      v-bind="args"
      v-model="current"
      :items="items"
    />`,
  }),
};

Basic.parameters = {
  chromatic: { disableSnapshot: false },
  docs: {
    source: {
      code: `<template>
  <UiSimpleQuestion
    v-bind="args"
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiSimpleQuestion } from '@infermedica/component-library';

const modelValue = ref('');
const items = [
  {
    value: 'female',
    label: 'Female',
    icon: 'female',
    'data-testid': 'female',
    iconAttrs: { 'data-testid': 'female-icon' },
    textLabelAttrs: { 'data-testid': 'female-label' },
  },
  {
    value: 'male',
    label: 'Male',
    icon: 'male',
    iconAttrs: { 'data-testid': 'male-icon' },
    textLabelAttrs: { 'data-testid': 'male-label' },
  },
];
const modifiers = '';
</script>
`,
    },
  },
};

export const Small: SimpleQuestionStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiSimpleQuestion },
    setup(props, { attrs }) {
      const {
        modelValue,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        current,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSimpleQuestion
    v-model="current"
    :items="items"
    :class="'ui-simple-question--small'"
  />`,
  }),
};

Small.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
    <UiSimpleQuestion
      v-bind="args"
      v-model="modelValue"
      :items="items"
      :class="modifiers"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { UiSimpleQuestion } from '@infermedica/component-library';
  
  const modelValue = ref('');
  const items = [
    {
      value: 'female',
      label: 'Female',
      icon: 'female',
      'data-testid': 'female',
      iconAttrs: { 'data-testid': 'female-icon' },
      textLabelAttrs: { 'data-testid': 'female-label' },
    },
    {
      value: 'male',
      label: 'Male',
      icon: 'male',
      iconAttrs: { 'data-testid': 'male-icon' },
      textLabelAttrs: { 'data-testid': 'male-label' },
    },
  ];
  const modifiers = 'ui-simple-question--small';
  </script>`,
    },
  },
};

export const WithTileSlot: SimpleQuestionStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiSimpleQuestion,
      UiTile,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        current,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSimpleQuestion
      v-bind="args"  
      v-model="current"
      :items="items"
    >
      <template #tile="{
        item,
        modelValue,
        isTileSmall,
        updateHandler
      }">
        <UiTile
          :model-value="modelValue"
          :value="item.value"
          :icon="item.icon"
          :icon-attrs="item.iconAttrs"
          :text-label-attrs="item.textLabelAttrs"
          v-bind="{
            'data-testid': item['data-testid'],
          }"
          :class="[
            'ui-simple-question__item',
            { 'ui-tile--small': isTileSmall }
          ]"
          @update:modelValue="updateHandler(item.value)"
        >
          {{ item.label }}
        </UiTile>
      </template>
    </UiSimpleQuestion>`,
  }),
};

WithTileSlot.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiSimpleQuestion
    v-bind="attrs"
    v-model="modelValue"
    :items="items"
  >
    <template #tile="{ 
      item,
      modelValue,
      isTileSmall,
      updateHandler,
    }"
    >
      <UiTile
        :model-value="modelValue"
        :value="item.value"
        :icon="item.icon"
        :icon-attrs="item.iconAttrs"
        :text-label-attrs="item.textLabelAttrs"
        v-bind="{
          'data-testid': item['data-testid'],
        }"
        :class="['ui-simple-question__item', { 'ui-tile--small': isTileSmall }]"
        @update:modelValue="updateHandler(item.value)"
      >
        {{ item.label }}
      </UiTile>
    </template>
  </UiSimpleQuestion>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useAttrs,
} from 'vue';
import {
  UiSimpleQuestion,
  SimpleQuestionProps,
  SimpleQuestionAttrsProps,
  UiTile,
 } from '@infermedica/component-library';

const modelValue = ref('');
const attrs: SimpleQuestionAttrsProps = useAttrs();
const isTileSmall = computed(
  () => attrs.class && attrs.class.includes('ui-simple-question--small')
);
const items = [
  {
    value: 'female',
    label: 'Female',
    icon: 'female',
    'data-testid': 'female',
    iconAttrs: { 'data-testid': 'female-icon' },
    textLabelAttrs: { 'data-testid': 'female-label' },
  },
  {
    value: 'male',
    label: 'Male',
    icon: 'male',
    iconAttrs: { 'data-testid': 'male-icon' },
    textLabelAttrs: { 'data-testid': 'male-label' },
  },
];
const modifiers = 'ui-simple-question--small';

const updateHandler = (value: SimpleQuestionProps['modelValue']) => {
  emit('update:modelValue', value);
};
</script>
`,
    },
  },
};
