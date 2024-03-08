<template>
  <UiList
    class="ui-menu"
    @keydown="handleMenuKeydown"
  >
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
import {
  ref,
  computed,
  type Ref,
  provide,
} from 'vue';
import useMenuItems from '@/components/organisms/UiMenu/useMenuItems';
import { focusElement } from '../../../utilities/helpers';
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
  /**
   * Use this props to allow using arrows to navigation.
   */
  enableKeyboardNavigation?: boolean;
}
export type MenuAttrsProps = DefineAttrsProps<MenuProps, ListAttrsProps>;
export interface MenuItem {
  $el: HTMLLIElement,
  tabindex: Ref<number | null>
}

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => ([]),
  enableKeyboardNavigation: false,
});
const menuItemAttrs = ({
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

const menuItemsTemplateRef = ref([]);
provide('menuItemsTemplateRef', menuItemsTemplateRef);
const {
  firstMenuItem,
  lastMenuItem,
  prevMenuItem,
  nextMenuItem,
  focusedMenuItem,
  selectedMenuItem,
} = useMenuItems(menuItemsTemplateRef);
const handleMenuKeydown = async ({ key }: KeyboardEvent) => {
  if (!props.enableKeyboardNavigation) return;
  switch (key) {
    case 'ArrowUp':
      if (prevMenuItem.value
          && focusedMenuItem.value) {
        await focusElement(prevMenuItem.value.content.$el, true);
      }
      break;
    case 'ArrowDown':
      if (nextMenuItem.value
          && focusedMenuItem.value) {
        await focusElement(nextMenuItem.value.content.$el, true);
      }
      break;
    case 'Home':
    case 'PageUp':
      if (firstMenuItem.value
          && focusedMenuItem.value) {
        await focusElement(firstMenuItem.value.content.$el, true);
      }
      break;
    case 'End':
    case 'PageDown':
      if (lastMenuItem.value
          && focusedMenuItem.value) {
        await focusElement(lastMenuItem.value.content.$el, true);
      }
      break;
  }
};

</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-menu {
  &--compact {
    .ui-menu-item {
      &__button {
        @include mixins.override-logical(list-item-content, "menu-item-button", padding, var(--space-4) var(--space-8));
        @include mixins.override-logical(list-item-tablet-content, "menu-item-button", padding, var(--space-4) var(--space-8));
        @include mixins.override-logical(button, "menu-item-button", padding, var(--space-4) var(--space-8));
      }
    }
  }
}
</style>
