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
  watch,
  computed,
  provide,
} from 'vue';
import type { CSSProperties } from 'vue';
import UiTabsItem from './_internal/UiTabsItem.vue';
import type { TabsItemAttrsProps } from './_internal/UiTabsItem.vue';
import type { DefineAttrsProps } from '../../../types';

export type TabsHandleTabActive = (event: Event, name: string) => void;
export type TabsSetActiveElement = (element: HTMLElement | null) => void;
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
const activeTab = ref(props.modelValue);
provide('activeTab', activeTab);
watch(activeTab, (name) => {
  emit('update:modelValue', name);
});
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
const tabs = ref<HTMLDivElement | null>(null);
const activeTabHTMLElement = ref<HTMLElement | null>(null);
const offsetX = computed(() => {
  if (activeTabHTMLElement.value === null) return 0;
  const firstTab = tabs.value?.children[0].children[0];
  const activeTabRect = activeTabHTMLElement.value.getBoundingClientRect();
  const tabsRect = tabs.value?.getBoundingClientRect();
  if (!firstTab) return 0;
  if (tabsRect && Math.ceil((firstTab.getBoundingClientRect().right / tabsRect.right) * 100) > 50) {
    return ((activeTabRect.x + activeTabRect.width) - firstTab.getBoundingClientRect().right);
  }
  return activeTabRect.x - firstTab.getBoundingClientRect().x;
});
const scale = computed(() => {
  if (activeTabHTMLElement.value === null) return 1;
  const firstTabRect = tabs.value?.children[0].children[0].getBoundingClientRect();
  if (!firstTabRect) return 1;
  const activeTabRect = activeTabHTMLElement.value.getBoundingClientRect();
  return activeTabRect.width / firstTabRect.width;
});
const style = computed<CSSProperties>(() => ({
  '--_tabs-indicator-offset-x': `${offsetX.value}px`,
  '--_tabs-indicator-scale-x': scale.value,
}));
const setActiveHTMLElement = (element: HTMLElement | null): void => {
  activeTabHTMLElement.value = element;
};
provide<TabsSetActiveElement>('setActiveHTMLElement', setActiveHTMLElement);
const handleTabActive = (event: Event, name: string) => {
  const target = event.target as HTMLElement;
  setActiveHTMLElement(target.parentElement);
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

    --tabs-item-tab-flex: 1;
    --tabs-item-content-margin-block: 0;
    --tabs-item-content-margin-inline: 0;
  }
}
</style>
