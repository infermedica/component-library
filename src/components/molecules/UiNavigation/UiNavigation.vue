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
import type { ComputedRef } from 'vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';
import type { NavigationItemAttrsProps } from './_internal/UiNavigationItem.vue';
import type { DefineAttrsProps } from '../../../types';

export interface NavigationRenderItem extends NavigationItemAttrsProps {
  name?: string;
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
const modifiers = computed(() => (attrs.class as string || ''));
provide<ComputedRef<string>>('modifiers', modifiers);
const itemsToRender = computed<NavigationRenderItem[]>(() => (props.items.map((item, key) => {
  const {
    name,
    label,
  } = item;
  return {
    name: name || `navigation-item-${key}`,
    label,
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

  @include mixins.use-logical($element, padding, var(--space-24) var(--space-20));

  display: flex;
  flex-flow:
    functions.var(
      $element,
      flex-flow,
      functions.var($element, flex-direction, row) functions.var($element, flex-wrap, wrap)
    );
  align-items: functions.var($element, align-items, flex-start);
  justify-content: functions.var($element, justify-content, center);
  flex-direction: functions.var($element, flex-direction, column);
  gap: functions.var($element, gap, var(--space-12) var(--space-16));

  @include mixins.from-tablet {
    @include mixins.use-logical($element + "-tablet", padding, var(--space-24) var(--space-16));

    align-items: functions.var($element + '-tablet', align-items, center);
    justify-content: functions.var($element + '-tablet', justify-content, center);
    flex-direction: functions.var($element + '-tablet', flex-direction, row);
  }
}
</style>
