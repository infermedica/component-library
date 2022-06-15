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
          :name="item.name"
          :title="item.title"
          :button-attrs="item.buttonAttrs"
          v-bind="item.tabsItemAttrs"
        >
          <!-- @slot Use this slot to place tab item content. -->
          <slot
            :name="item.name"
            v-bind="{item}"
          />
        </UiTabsItem>
      </template>
    </slot>
  </div>
</template>

<script setup>
import {
  ref, watch, computed, provide,
} from 'vue';
import UiTabsItem from './_internal/UiTabsItem.vue';

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
    type: Array,
    default: () => ([]),
  },
});
const activeTab = ref(props.modelValue);
provide('activeTab', activeTab);

const emit = defineEmits(['update:modelValue']);
watch(activeTab, (name) => {
  emit('update:modelValue', name);
});
const itemsToRender = computed(() => (props.items.map((item, key) => {
  const { name } = item;
  if (typeof item === 'string') {
    return {
      name: `tabs-item-${key}`,
      title: item,
    };
  }
  return {
    name: name || `tabs-item-${key}`,
    ...item,
  };
})));

const tabs = ref(null);
const activeTabHTMLElement = ref(null);
const offsetX = computed(() => {
  if (activeTabHTMLElement.value === null) return 0;
  const firstTab = tabs.value.children[0].children[0];
  const activeTabRect = activeTabHTMLElement.value.getBoundingClientRect();
  const tabsRect = tabs.value.getBoundingClientRect();
  if (Math.ceil((firstTab.getBoundingClientRect().right / tabsRect.right) * 100) > 50) {
    return ((activeTabRect.x + activeTabRect.width) - firstTab.getBoundingClientRect().right);
  }
  return activeTabRect.x - firstTab.getBoundingClientRect().x;
});
const scale = computed(() => {
  if (activeTabHTMLElement.value === null) return 1;
  const firstTabRect = tabs.value.children[0].children[0].getBoundingClientRect();
  const activeTabRect = activeTabHTMLElement.value.getBoundingClientRect();
  return activeTabRect.width / firstTabRect.width;
});
const width = computed(() => {
  if (activeTabHTMLElement.value === null) return 0;
  const { width: activeTabWidth } = activeTabHTMLElement.value.getBoundingClientRect();
  return activeTabWidth;
});
const style = computed(() => ({
  '--tabs-underline-offset-x': `${offsetX.value}px`,
  '--tabs-underline-scale': scale.value,
}));
const setActiveHTMLElement = (element) => {
  activeTabHTMLElement.value = element;
};
provide('setActiveHTMLElement', setActiveHTMLElement);
const handleTabActive = ({ target }, name) => {
  setActiveHTMLElement(target.parentElement);
  activeTab.value = name;
};
provide('handleTabActive', handleTabActive);
</script>

<style lang="scss">
.ui-tabs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: var(--tabs-padding, 0 var(--space-20));

  &--fixed {
    --tabs-padding: 0;
    --tabs-item-tab-flex: 1;
    --tabs-item-content-margin: 0;
  }
}
</style>
