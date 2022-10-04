<template>
  <component
    :is="tag"
    class="ui-menu"
  >
    <!-- @slot Use this slot to place menu items -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiMenuItem
          v-bind="item"
        >
          <template
            v-for="(_, name) in $slots"
            #[name]="slotData"
          >
            <slot
              :name="name"
              v-bind="slotData"
            />
          </template>

          <!-- @slot Use this slot to place menu item content. -->
          <slot
            :name="item.name"
            v-bind="{
              item
            }"
          >
            {{ item.label }}
          </slot>
        </UiMenuItem>
      </template>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import UiMenuItem from './_internal/UiMenuItem.vue';
import UiList from '../UiList/UiList.vue';
import type { Icon } from '../../../types/icon';

export type MenuIconVisible = 'default' | 'always' | 'never';
export interface MenuItem {
  label: string;
  name?: string;
  icon?: Icon;
  iconLabel?: string;
  iconVisible?: MenuIconVisible;
  iconAttrs?: Record<string, unknown>;
  listItemAttrs?: Record<string, unknown>;
  [key: string]: unknown;
}
const props = defineProps({
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: UiList,
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => ([]),
  },
});
const itemsToRender = computed(() => (
  props.items.map((item, key) => ({
    name: item.name || `menu-item-${key}`,
    ...item,
  }))));
</script>
