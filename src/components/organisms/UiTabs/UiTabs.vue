<template>
  <div
    ref="tabs"
    class="ui-tabs"
    :style="style"
  >
    <!-- @slot Use this slot to place tabs. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiTabsItem
          v-bind="item"
        >
          <!-- @slot Use this slot to place tab item content. -->
          <slot
            :name="item.name"
            v-bind="{ item }"
          />
        </UiTabsItem>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  onMounted,
  reactive,
  watchEffect,
} from 'vue';
import type { CSSProperties } from 'vue';
import UiTabsItem from './_internal/UiTabsItem.vue';
import type { TabsItemAttrsProps } from './_internal/UiTabsItem.vue';
import type { DefineAttrsProps } from '../../../types';
import type { OrNull } from '../../../types/utils';

export type TabsHandleTabActive = (name: string) => void;
export type TabsSetActiveElement = (element: OrNull<HTMLElement>) => void;
export interface TabsProps {
  /**
   * Use this props or v-model to set opened items.
   */
  modelValue?: string;
  /**
   * Use this props to pass tabs items.
   */
  items?: TabsItemAttrsProps[];
}
export type TabsAttrsProps = DefineAttrsProps<TabsProps>;
export interface TabsEmits {
  (e:'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  items: () => ([]),
});
const emit = defineEmits<TabsEmits>();
const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
provide('activeTab', activeTab);
const itemsToRender = computed<TabsProps['items']>(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `tabs-item-${key}`,
      title: item,
    };
  }
  const { name } = item;
  return {
    ...item,
    name: name || `tabs-item-${key}`,
  };
})));

const tabs = ref<OrNull<HTMLDivElement>>(null);
const activeTabEl = ref<OrNull<HTMLElement>>(null);
const offsetX = ref(0);
const offsetY = ref(0);

const containerRect = reactive({
  w: 0,
  y: 0,
  h: 0,
});

const calculateOffset = () => {
  const firstTab = tabs.value?.children[0].children[0];
  if (!activeTabEl.value || !firstTab) return;
  const activeRect = activeTabEl.value.getBoundingClientRect();
  const firstRect = firstTab.getBoundingClientRect();

  offsetX.value = activeRect.x - firstRect.x;
  offsetY.value = activeRect.y - containerRect.y;
};

const scale = computed(() => {
  if (activeTabEl.value === null) return 1;
  const firstTabRect = tabs.value?.children[0].children[0].getBoundingClientRect();
  if (!firstTabRect) return 1;
  const activeTabRect = activeTabEl.value.getBoundingClientRect();
  return activeTabRect.width / firstTabRect.width;
});

const containerObserver = new ResizeObserver(([ { target } ]) => {
  const rect = target.getBoundingClientRect();
  containerRect.w = rect.width;
  containerRect.h = rect.height;
  containerRect.y = rect.y;
  calculateOffset();
});

onMounted(() => {
  if (tabs.value) containerObserver.observe(tabs.value);
});

watchEffect(calculateOffset);

const style = computed<CSSProperties>(() => ({
  '--_tabs-indicator-offset-y': `${offsetY.value}px`,
  '--_tabs-indicator-offset-x': `${offsetX.value}px`,
  '--_tabs-indicator-scale-x': scale.value,
}));
const setActiveHTMLElement = (element: OrNull<HTMLElement>): void => {
  activeTabEl.value = element;
};
provide<TabsSetActiveElement>('setActiveHTMLElement', setActiveHTMLElement);
const handleTabActive = (name: string) => {
  activeTab.value = name;
};
provide<TabsHandleTabActive>('handleTabActive', handleTabActive);
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-tabs {
  $element: tabs;

  @include mixins.use-logical($element, padding, 0 var(--space-20));

  position: relative;
  display: flex;
  flex-wrap: wrap;

  &--fixed {
    @include mixins.use-logical($element, padding, 0);
    @include mixins.override-logical(tabs-item-content, null, margin, 0);

    --tabs-item-tab-flex: 1;
  }
}
</style>
