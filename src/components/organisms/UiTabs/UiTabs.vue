<template>
  <div
    ref="tabs"
    class="ui-tabs"
    :class="{
      'ui-tabs--prevent-transition': preventTransition
    }"
    :style="style"
  >
    <!-- @slot Use this slot to place accordion items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiTabsItem
          :name="item.name"
          :title="item.title"
          :button-attrs="item.buttonAttrs"
        >
          <!-- @slot Use this slot to replace tab item content. -->
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
import { computed, ref, provide } from 'vue';
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
const emit = defineEmits(['update:modelValue']);
const opened = computed(() => (props.modelValue));
provide('opened', opened);

function toggle(name) {
  emit('update:modelValue', name);
}
provide('toggle', toggle);

const preventTransition = ref(true);
const tabs = ref(null);
const dividerGapY = ref(0);
const underlineWidth = ref(0);
const underlineX = ref(0);
const style = computed(() => ({
  '--tabs-divider-gap-y': `${dividerGapY.value}px`,
  '--tabs-underline-width': `${underlineWidth.value}px`,
  '--tabs-underline-x': underlineX.value && `${underlineX.value}px`,
}));
const underline = (element) => {
  const { x: tabsX } = tabs.value.getBoundingClientRect();
  const { x: elementX, width: elementWidth } = element.getBoundingClientRect();
  underlineWidth.value = elementWidth;
  // FIXME: potential bug with calculation in RTL
  // elementX might be broken depending how RTL property is implemented
  // maybe it should somehow force a recalculate on direction change
  underlineX.value = elementX - tabsX;
};
function gap(element) {
  if (dividerGapY.value) return;
  dividerGapY.value = element.getBoundingClientRect()?.height - 1;
  preventTransition.value = false;
}
provide('underline', underline);
provide('gap', gap);

const itemsToRender = computed(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `tabs-item-${key}`,
      text: item,
    };
  }
  return {
    name: item.name || `tabs-item-${key}`,
    ...item,
  };
})));
</script>

<style lang="scss">
.ui-tabs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: var(--tabs-padding, 0);

  &::before,
  &::after {
    position: absolute;
    top: var(--tabs-divider-gap-y, 55px);
    left: 0;
    content: "";
  }

  &::before {
    width: 100%;
    height: 1px;
    background: var(--tabs-underline-border, var(--color-border-divider));
  }

  &::after {
    width: var(--tabs-underline-width, 100%);
    height: 2px;
    background: var(--tabs-underline-color, var(--color-border-selection));
    // No RTL necessary due to being JS generated
    transform: translateX(var(--tabs-underline-x, var(--tabs-underline-x-default, 0))) translateY(-1px);
    transition: transform 150ms ease-in-out;
  }

  &--fixed {
    --tabs-item-tab-margin: var(--tabs-item-tab-fixed-margin, 0);
    --tabs-item-tab-padding: var(--tabs-item-tab-fixed-padding, var(--space-16) var(--space-8));
    --tabs-item-tab-flex: 1;
  }

  &--prevent-transition {
    &::after {
      transition: none;
    }
  }
}
</style>
