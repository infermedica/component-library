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
            v-bind="{
              item
            }"
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
import type {
  PropType,
  CSSProperties,
} from 'vue';
import UiTabsItem from './_internal/UiTabsItem.vue';

export interface TabsItem {
    name: string;
    title: string;
    buttonAttrs?: Record<string, unknown>;
    tabsItemAttrs?: Record<string, unknown>;
    [key: string]: unknown;
}
const props = defineProps({
  /**
   * Use this props or v-model to set opened items.
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass tabs items.
   */
  items: {
    type: Array as PropType<TabsItem[]>,
    default: () => ([]),
  },
});
const activeTab = ref(props.modelValue);
provide('activeTab', activeTab);

const emit = defineEmits<{(e:'update:modelValue', value: string): void}>();
watch(activeTab, (name) => {
  emit('update:modelValue', name);
});
const itemsToRender = computed(() => (props.items.map((item, key) => {
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
provide('setActiveHTMLElement', setActiveHTMLElement);
const handleTabActive = (event: Event, name: string): void => {
  const target = event.target as HTMLElement;
  setActiveHTMLElement(target.parentElement);
  activeTab.value = name;
};
provide('handleTabActive', handleTabActive);
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-tabs {
  $element: tabs;

  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: functions.var($element, padding, 0 var(--space-20));

  &--fixed {
    --tabs-item-tab-flex: 1;
    --tabs-item-content-margin: 0;

    padding: functions.var($element, padding, 0);
  }
}
</style>
