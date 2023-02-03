<template>
  <nav
    ref="nav"
    class="ui-navigation"
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
  useAttrs,
  provide,
} from 'vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';
import type { NavigationItemAttrsProps } from './_internal/UiNavigationItem.vue';
import type { DefineAttrsProps } from '../../../types';

export interface NavigationRenderItem extends NavigationItemAttrsProps {
  name?: string;
  text?: string;
  label?: string;
}
export interface NavigationProps {
  /**
   * Use this props to pass list of navigation items.
   */
  items?: NavigationRenderItem[],
}
export type NavigationAttrsProps = DefineAttrsProps<NavigationProps>;

const props = withDefaults(defineProps<NavigationProps>(), { items: () => ([]) });
const attrs = useAttrs();
const nav = ref<HTMLElement | null>(null);
const modifiers = computed(() => (attrs.class || ''));
provide('modifiers', modifiers);
const itemsToRender = computed<NavigationRenderItem[]>(() => (props.items.map((item, key) => {
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
const navigationItemAttrs = ({
  name, label, ...rest
}: NavigationRenderItem): NavigationItemAttrsProps => rest;
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

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
  gap: functions.var($element, gap, var(--space-12) var(--space-16));
}
</style>
