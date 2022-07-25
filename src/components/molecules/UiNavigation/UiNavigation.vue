<template>
  <nav
    ref="nav"
    class="ui-navigation"
    :class="{'ui-navigation--is-multiline': isMultiline}"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiNavigationItem
          class=" ui-navigation__item"
          v-bind="item.navigationItemAttrs"
        >
          <!-- @slot Use this slot to replace navigation item content. -->
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            {{ item.text }}
          </slot>
        </UiNavigationItem>
      </template>
    </slot>
  </nav>
</template>

<script setup lang="ts">
import {
  computed, ref, onMounted, onBeforeUnmount, nextTick, useAttrs, provide,
} from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiNavigationItem from './_internal/UiNavigationItem.vue';

export interface NavigationItem {
  text: string;
  href: string;
  name?: string
  [key: string]: unknown;
}
export interface NavigationRenderItem {
  name: string;
  text: string;
  navigationItemAttrs: Record<string, unknown>
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
  /**
   * Use this props to pass attrs for all navigation items.
   */
  navigationItemsAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const attrs = useAttrs() as {class: string};
const nav = ref<HTMLElement | null>(null);
const isMultiline = ref(false);
const modifiers = computed(() => (attrs?.class || ''));
provide('modifiers', modifiers);
const itemsToRender = computed<NavigationRenderItem[]>(() => (props.items.map((item: NavigationItem, key: number) => {
  const { name, text, ...itemAttrs } = item;
  return {
    name: name || `navigation-item-${key}`,
    text,
    navigationItemAttrs: { ...props.navigationItemsAttrs, ...itemAttrs },
  };
})));
const resizeObserver = new ResizeObserver((entries) => {
  const { target } = entries[0];
  isMultiline.value = ([...target.children].at(-1) as HTMLElement).offsetTop > (target as HTMLElement).offsetTop;
});
onMounted(async () => {
  await nextTick();
  resizeObserver.observe(nav.value as HTMLElement);
});
onBeforeUnmount(() => {
  resizeObserver.unobserve(nav.value as HTMLElement);
});
</script>

<style lang="scss">
.ui-navigation {
  $this: &;

  display: var(--navigation-display, inline-flex);
  flex-flow: var(--navigation-flow, row wrap);
  align-items: var(--navigation-align-items, center);
  justify-content: var(--navigation-justify-content, center);
  margin: var(--navigation-margin, 0 calc(var(--space-8) * -1));

  &--is-multiline {
    --navigation-margin: var(--navigation-multiline-margin, 0 calc(var(--space-8) * -1) calc(var(--space-12) * -1));
    --navigation-item-margin: var(--navigation-item-multiline-margin, 0 var(--space-8) var(--space-12));
  }
}
</style>
