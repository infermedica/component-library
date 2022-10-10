<template>
  <nav
    ref="nav"
    class="ui-navigation"
    :class="{ 'ui-navigation--is-multiline': isMultiline }"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiNavigationItem
          class=" ui-navigation__item"
          v-bind="navigationItemAttrs(item)"
        >
          <!-- @slot Use this slot to replace navigation item content. -->
          <slot
            :name="item.name"
            v-bind="{ item }"
          >
            {{ item.label }}
          </slot>
        </UiNavigationItem>
      </template>
    </slot>
  </nav>
</template>

<script lang="ts">
export default { name: 'UiNavigation' };
</script>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  useAttrs,
  provide,
} from 'vue';
import type { PropType } from 'vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';

export interface NavigationItem {
  text: string;
  name?: string;
  label?: string;
  navigationItemAttrs?: Record<string, unknown>
  [key: string]: unknown;
}
const props = defineProps({
  /**
   * Use this props to pass list of navigation items.
   */
  items: {
    type: Array as PropType<NavigationItem[]>,
    default: () => ([]),
  },
});
const attrs = useAttrs() as {class: string};
const nav = ref<HTMLElement | null>(null);
const isMultiline = ref(false);
const modifiers = computed(() => (attrs?.class || ''));
provide('modifiers', modifiers);
const itemsToRender = computed(() => (props.items.map((item, key) => {
  const {
    name,
    label,
    text,
  } = item;
  // TODO: remove in 0.6.0 / BEGIN
  if (text) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[@infermedica/component-library error][UiNavigationItem]: The `text` property from `items` props will be removed in 0.6.0. Please use `label` property instead.');
    }
  }
  // END
  return {
    name: name || `navigation-item-${key}`,
    label: text || label,
    ...item,
  };
})));
const resizeObserver = new ResizeObserver((entries) => {
  const { target } = entries[0];
  isMultiline.value = ([ ...target.children ].at(-1) as HTMLElement).offsetTop > (target as HTMLElement).offsetTop;
});
onMounted(async () => {
  await nextTick();
  resizeObserver.observe(nav.value as HTMLElement);
});
onBeforeUnmount(() => {
  resizeObserver.unobserve(nav.value as HTMLElement);
});
const navigationItemAttrs = (item: NavigationItem) => {
  const {
    name, label, ...rest
  } = item;
  return rest;
};
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-navigation {
  $this: &;
  $element: navigation;

  display: flex;
  flex-flow:
    functions.var(
      $element,
      flex-flow,
      functions.var($element, flex-direction, row) functions.var($element, flex-wrap, wrap)
    );
  align-items: functions.var($element, align-items, center);
  justify-content: functions.var($element, justify-content, flex-start);
  margin: functions.var($element, margin, 0 calc(var(--space-8) * -1));

  &--is-multiline {
    margin: functions.var($element, margin, 0 calc(var(--space-8) * -1) calc(var(--space-12) * -1));
  }
}
</style>
