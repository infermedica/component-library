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
    modifiers: [],
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
      #[item.name]="{ item }"
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
  import {
    UiTabs,
    UiText,
    TabsProps,
  } from '@infermedica/component-library';
  
  const modelValue = ref<TabsProps['modelValue']>('point');
  const items: TabsProps['items'] = [
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

export const Fixed: TabsStoryType = { ...Basic };
Fixed.args = { modifiers: [ 'ui-tabs--fixed' ] };
Fixed.parameters = {
  docs: {
    source: {
      code: `<template>
      <UiTabs
        v-model="modelValue"
        :items="items"
        class="ui-tabs--fixed"
      >
      <template
        v-for="(item, key) in items"
        #[item.name]="{ item }"
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
    import {
      UiTabs,
      UiText,
    } from '@infermedica/component-library';
    import type { TabsProps } from '@infermedica/component-library';
    
    const modelValue = ref<TabsProps['modelValue']>('point');
    const items: TabsProps['items'] = [
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
    const content = {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    };
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
        current,
        items,
        content,
        args: {
          ...args,
          class: modifiers,
        }
        ,
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
WithDefaultSlot.parameters = {
  chromatic: { disableSnapshot: true },
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
        :data-testid="item['data-testid']"
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
  import {
    UiTabs,
    UiText,
  } from '@infermedica/component-library';
  import type { TabsProps } from '@infermedica/component-library'
  import UiTabsItem from '@infermedica/component-library/src/components/organisms/UiTabs/_internal/UiTabsItem.vue';
  
  const modelValue = ref<TabsProps['modelValue']>('point');
  const items: TabsProps['items'] = [
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
  const content = {
    search: 'Serum uric acid concentration',
    point: '1. Erythrocyte Sedimentation Rate',
  };
  const modifiers = '';
  </script>`,
    },
  },
};
