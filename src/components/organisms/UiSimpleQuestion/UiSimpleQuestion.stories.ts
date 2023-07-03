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
import deepmerge from 'deepmerge';

type SimpleQuestionArgsType = SimpleQuestionProps & {
  modelValue?: TileModelValue,
  items?: SimpleQuestionItem[],
  modifiers?: string,
}
type SimpleQuestionMetaType = Meta<SimpleQuestionArgsType>
type SimpleQuestionStoryType = StoryObj<SimpleQuestionArgsType>

const { argTypes } = useArgTypes(deepmerge(UiSimpleQuestion, { __docgenInfo: { modifiers: [ 'ui-simple-question--small' ] } }));
const meta = {
  title: 'Organisms/SimpleQuestion',
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
    modifiers: [],
    modelValue: '',
  },
  argTypes: {
    ...argTypes,
    items: {
      control: 'object',
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
    },
    modelValue: { control: 'text' },
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
      const value = ref(modelValue);
      return {
        value,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSimpleQuestion
      v-model="value"
      v-bind="args"
      :items="items"
    />`,
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiSimpleQuestion
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiSimpleQuestion } from '@infermedica/component-library';
import type { SimpleQuestionProps } from '@infermedica/component-library'; 

const modelValue = ref<SimpleQuestionProps['modelValue']>('');
const items: SimpleQuestionProps['items'] = ${JSON.stringify(meta.args.items, undefined, 2)};
</script>`,
    },
  },
};

export const Small: SimpleQuestionStoryType = { ...Basic };
Small.args = { modifiers: [ 'ui-simple-question--small' ] };
Small.parameters = {
  docs: {
    source: {
      code: `<template>
    <UiSimpleQuestion
      v-model="modelValue"
      :items="items"
      class="ui-simple-question--small"
    />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { UiSimpleQuestion } from '@infermedica/component-library';
  import type { SimpleQuestionProps } from '@infermedica/component-library';

  const modelValue = ref<SimpleQuestionProps['modelValue']>('');
  const items: SimpleQuestionProps['items'] = ${JSON.stringify(meta.args.items, undefined, 2)};
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

      const value = ref(modelValue);

      return {
        value,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiSimpleQuestion
      v-model="value"
      v-bind="args"
      :items="items"
    >
      <template #tile="{
        item,
        modelValue,
        isTileSmall,
        tileItemAttrs,
        updateHandler
      }">
        <UiTile
          v-bind="tileItemAttrs(item)"
          :model-value="modelValue"
          :class="{ 'ui-tile--small': isTileSmall }"
          class="ui-simple-question__item"
          @update:model-value="updateHandler(item.value)"
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
    v-model="modelValue"
    :items="items"
  >
    <template #tile="{
      item,
      modelValue,
      isTileSmall,
      tileItemAttrs,
      updateHandler
    }">
      <UiTile
        v-bind="tileItemAttrs(item)"
        :model-value="modelValue"
        :class="{ 'ui-tile--small': isTileSmall }"
        class="ui-simple-question__item"
        @update:model-value="updateHandler(item.value)"
      >
        {{ item.label }}
      </UiTile>
    </template>
  </UiSimpleQuestion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiSimpleQuestion,
  UiTile,
 } from '@infermedica/component-library';
import type { SimpleQuestionProps } from '@infermedica/component-library';

const modelValue = ref<SimpleQuestionProps['modelValue']>('');
const items: SimpleQuestionProps['items'] = ${JSON.stringify(meta.args.items, undefined, 2)};
</script>`,
    },
  },
};
