<template>
  <UiList class="ui-menu">
    <!-- @slot Use this slot to place menu items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiMenuItem
          v-bind="menuItemAttrs(item)"
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
  </UiList>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import type { Icon } from '../../../types/icon';
import UiList from '../UiList/UiList.vue';
import UiMenuItem from './_internal/UiMenuItem.vue';

export type MenuSuffixVisible = 'default' | 'always' | 'never';
export interface SuffixAttrs {
  label?: string;
  icon?: Icon;
  iconSuffixAttrs?: Record<string, unknown>;
  [key: string]: unknown;
}
export interface MenuItem {
  label: string;
  name?: string;
  icon?: Icon;
  suffixVisible?: MenuSuffixVisible;
  suffixAttrs?: SuffixAttrs;
  buttonMenuItemAttrs?: Record<string, unknown>;
  [key: string]: unknown;
}

const props = defineProps({
  /**
   * Use this to set menu tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'ul',
  },
  /**
   * Use this props to pass list of menu items.
   */
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => ([]),
  },
});
const menuItemAttrs = (item: MenuItem) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    name, label, ...rest
  } = item;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return rest;
};
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

<style lang="scss">
@use "../../../styles/functions";

.ui-menu {
  &--compact {
    .ui-menu-item {
      &__button {
        --_list-item-content-padding-block: #{functions.var("menu-item-button", padding-block, var(--space-4))};
        --_list-item-content-padding-inline: #{functions.var("menu-item-button", padding-inline, var(--space-8))};
        --list-item-content-padding-block: var(--_list-item-content-padding-block);
        --list-item-content-padding-inline: var(--_list-item-content-padding-inline);
        --list-item-tablet-content-padding-block: var(--_list-item-content-padding-block);
        --list-item-tablet-content-padding-inline: var(--_list-item-content-padding-inline);
        --button-padding-block: var(-_list-item-content-padding-block);
        --button-padding-inline: var(-_list-item-content-padding-inline);
      }
    }
  }
}
</style>
