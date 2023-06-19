import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import type { TabsProps } from '@index';
import {
  UiTabs,
  UiText,
} from '@index';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import type { TabsItemAttrsProps } from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';

type TabsArgsType = TabsProps & {
  items?: TabsProps[],
  content?: Record<string, string>,
  modifiers?: string[]
}
type TabsMetaType = Meta<TabsArgsType>;
type TabsStoryType = StoryObj<TabsArgsType>

const items: TabsItemAttrsProps[] = [
  {
    name: 'search',
    title: 'Search',
    'data-testid': 'search',
    buttonTabAttrs: { 'data-testid': 'search-button' },
    contentAttrs: { 'data-testid': 'search-content' },
  },
  {
    name: 'point',
    title: 'Point on the body',
    buttonTabAttrs: { 'data-testid': 'point-button' },
    contentAttrs: { 'data-testid': 'point-content' },
  },
  {
    name: 'drop',
    title: 'Drop body point',
    buttonTabAttrs: { 'data-testid': 'drop-button' },
    contentAttrs: { 'data-testid': 'drop-content' },
  },
];

const { argTypes } = useArgTypes(UiTabs);

const meta = {
  title: 'Organisms/Tabs',
  component: UiTabs,
  args: {
    content:
      {
        search: 'Serum uric acid concentration',
        point: '1. Erythrocyte Sedimentation Rate',
      },

    modelValue: 'point',
    items,
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
    },
    ...argTypes,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies TabsMetaType;

export default meta;

export const Basic: TabsStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiTabs,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        content,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        current,
        items,
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiTabs
    v-bind="args"
    v-model="current"
    :items="items"
    >
    <template
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>
        {{ content[item.name] }}
      </UiText>
    </template>
  </UiTabs>`,
  }),
};

Basic.parameters = {
  chromatic: { disableSnapshot: false },
  docs: {
    source: {
      code: `<template>
    <UiTabs
    v-model="modelValue"
    :items="items"
    :class="modifiers"
    >
    <template
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>
        {{ content[item.name] }}
      </UiText>
    </template>
    </UiTabs>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { UiTabs, UiText } from '@infermedica/component-library';
  
  const modelValue = ref('point');
  const items = [
    {
      name: 'search',
      title: 'Search',
      'data-testid': 'search',
      buttonTabAttrs: { 'data-testid': 'search-button' },
      contentAttrs: { 'data-testid': 'search-content' },
    },
    {
      name: 'point',
      title: 'Point on the body',
    },
    {
      name: 'drop',
      title: 'Drop body point',
    },
  ];
  const content = {
    search: 'Serum uric acid concentration',
    point: '1. Erythrocyte Sedimentation Rate',
  };
  const modifiers = '';
  </script>
  `,
    },
  },
};

export const Fixed: TabsStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiTabs,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        content,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        args,
        current,
        items,
        content,
        modifiers,
      };
    },
    template: `<UiTabs
    v-model="current"
    :items="items"
    class="ui-tabs--fixed"
    >
    <template
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>
        {{ content[item.name] }}
      </UiText>
    </template>
  </UiTabs>`,
  }),
  args: { ...Basic.args },
};

Fixed.argTypes = { ...Basic.argTypes };

Fixed.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
      <UiTabs
      v-model="modelValue"
      :items="items"
      :class="modifiers"
      >
      <template
        v-for="(item, key) in items"
        #[item.name]="{item}"
        :key="key"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </template>
      </UiTabs>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    import { UiTabs, UiText } from '@infermedica/component-library';
    
    const modelValue = ref('point');
    const items = [
      {
        name: 'search',
        title: 'Search',
        'data-testid': 'search',
        buttonTabAttrs: { 'data-testid': 'search-button' },
        contentAttrs: { 'data-testid': 'search-content' },
      },
      {
        name: 'point',
        title: 'Point on the body',
      },
      {
        name: 'drop',
        title: 'Drop body point',
      },
    ];
    const content = {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    };
    const modifiers = 'ui-tabs-fixed';
    </script>
    `,
    },
  },
};

export const WithDefaultSlot: TabsStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiTabs,
      UiTabsItem,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue,
        content,
        items,
        modifiers,
        ...args
      } = attrs;

      const current = ref(modelValue);

      return {
        args,
        current,
        items,
        content,
        modifiers,
      };
    },
    template: `<UiTabs
    v-model="current"
    >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiTabsItem
        :title="item.title"
        :name="item.name"
        :button-attrs="item.buttonTabAttrs"
        :content-attrs="item.contentAttrs"
        v-bind="{
          'data-testid': item['data-testid'],
        }"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
  }),
};

WithDefaultSlot.argTypes = { ...Basic.argTypes };

WithDefaultSlot.parameters = {
  ...Basic.parameters,
  docs: {
    source: {
      code: `<template>
    <UiTabs
    v-model="modelValue"
    :class="modifiers"
    >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiTabsItem
        :title="item.title"
        :name="item.name"
        :button-attrs="item.buttonTabAttrs"
        :content-attrs="item.contentAttrs"
        v-bind="{
          'data-testid': item['data-testid'],
        }"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </UiTabsItem>
    </template>
    </UiTabs>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { UiTabs, UiTabsItem, UiText } from '@infermedica/component-library';
  import UiTabsItem from '@infermedica/component-library';
  
  const modelValue = ref('point');
  const items = [
    {
      name: 'search',
      title: 'Search',
      'data-testid': 'search',
      buttonTabAttrs: { 'data-testid': 'search-button' },
      contentAttrs: { 'data-testid': 'search-content' },
    },
    {
      name: 'point',
      title: 'Point on the body',
    },
    {
      name: 'drop',
      title: 'Drop body point',
    },
  ];
  const content = {
    search: 'Serum uric acid concentration',
    point: '1. Erythrocyte Sedimentation Rate',
  };
  const modifiers = '';
  </script>`,
    },
  },
};
