import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import { content as contentArgTypes } from '@sb/helpers/argTypes';
import { withModelValue } from '@sb/decorators';
import type {
  TabsProps,
  TabsItemAttrsProps,
} from '@index';
import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

type TabsArgsType = TabsProps & {
  items?: TabsProps[],
  content?: Record<string, string>,
  modifiers?: string[]
}

type TabsMetaType = Meta<TabsArgsType>;
type TabsStoryType = StoryObj<TabsArgsType>

const complexItemsData: TabsItemAttrsProps[] = [
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

const basicTemplate = `<UiTabs
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
</UiTabs>`;

const basicScript = `import { ref } from 'vue';
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
const modifiers = '';`;

const basicCode = `<template>
  ${basicTemplate}
</template>

<script setup lang="ts">
${basicScript}
</script>
`;

const fixedScript = `import { ref } from 'vue';
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
const modifiers = 'ui-tabs-fixed';`;

const fixedCode = `<template>
  ${basicTemplate}
</template>

<script setup lang="ts">
${fixedScript}
</script>
`;

const defaultSlotTemplate = `<UiTabs
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
  </UiTabs>`;

const defaultSlotScript = `import { ref } from 'vue';
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
const modifiers = '';`;

const defaultSlotCode = `<template>
  ${defaultSlotTemplate}
</template>

<script setup lang="ts">
${defaultSlotScript}
</script>`;

const { argTypes } = useArgTypes(UiTabs);

const meta = {
  title: 'Organisms/Tabs2',
  component: UiTabs,
  args: {
    modelValue: 'point',
    items: complexItemsData,
    content: {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    },
    modifiers: [],
  },
  argTypes: {
    ...argTypes,
    content: contentArgTypes,
  },
  decorators: [ withModelValue ],
  parameters: {
    cssProperties: {
      '--tabs-padding-block': 'var(--tabs-padding-block-start, 0) var(--tabs-padding-block-end, 0)',
      '--tabs-padding-inline':
        'var(--tabs-padding-inline-start, 0) var(--tabs-padding-inline-end, 0)',
    },
  },
} satisfies TabsMetaType;

export default meta;

export const Basic: TabsStoryType = {
  render: () => ({
    components: {
      UiTabs,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue, content, items, modifiers, ...args
      } = attrs;
      return {
        args,
        modelValue,
        items,
        content,
        modifiers,
      };
    },
    template: basicTemplate,
  }),
};

Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: { source: { code: basicCode } },
};

export const Fixed: TabsStoryType = {
  render: () => ({
    components: {
      UiTabs,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue, content, items, modifiers, ...args
      } = attrs;
      return {
        args,
        modelValue,
        items,
        content,
        modifiers,
      };
    },
    template: basicTemplate,
  }),
  args: {
    ...Basic.args,
    modifiers: [ 'ui-tabs--fixed' ],
  },
};

Fixed.parameters = {
  ...Basic.parameters,
  docs: { source: { code: fixedCode } },
};

export const WithDefaultSlot: TabsStoryType = {
  render: () => ({
    components: {
      UiTabs,
      UiTabsItem,
      UiText,
    },
    setup: (props, { attrs }) => {
      const {
        modelValue, content, items, modifiers, ...args
      } = attrs;
      return {
        args,
        modelValue,
        items,
        content,
        modifiers,
      };
    },
    template: defaultSlotTemplate,
  }),
};

WithDefaultSlot.parameters = {
  ...Basic.parameters,
  docs: { source: { code: defaultSlotCode } },
};
