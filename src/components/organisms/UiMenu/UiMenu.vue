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
          v-bind="(() =>{const {
            name, label, ...rest
          } = item; return rest;})()"
        >
          <template
            v-for="(_, name) in $slots"
            #[name]="data"
          >
            <slot
              v-bind="data"
              :name="name"
            />
          </template>

          <!-- @slot Use this slot to place menu item content. -->
          <slot
            v-bind="item"
            :name="item.name"
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
  /**
   * Use this to set menu tag.
   */
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: UiList,
  },
  /**
   * Use this props to pass list of menu items.
   */
  items: {
    type: Array as PropType<(string | MenuItem)[]>,
    default: () => ([]),
  },
});
const itemsToRender = computed(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `menu-item-${key}`,
      label: item,
    };
  }
  return {
    name: item.name || `menu-item-${key}`,
    ...item,
  };
})));
</script>
