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
import UiList from '../UiList/UiList.vue';
import type { ListAttrsProps } from '../UiList/UiList.vue';
import UiMenuItem from './_internal/UiMenuItem.vue';
import type { MenuItemAttrsProps } from './_internal/UiMenuItem.vue';
import type { DefineAttrsProps } from '../../../types';

export interface MenuRenderItem extends MenuItemAttrsProps {
  name?: string;
  label?: string;
}
export interface MenuProps {
  /**
   * Use this props to pass list of menu items.
   */
  items?: (string | MenuRenderItem)[];
}
export type MenuAttrsProps = DefineAttrsProps<MenuProps, ListAttrsProps>;

const props = withDefaults(defineProps<MenuProps>(), { items: () => ([]) });
const menuItemAttrs = ({
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  name, label, ...itemAttrs
}: MenuRenderItem) => itemAttrs;
const itemsToRender = computed<MenuRenderItem[]>(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `menu-item-${key}`,
      label: item,
    };
  }
  return {
    name: `menu-item-${key}`,
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
