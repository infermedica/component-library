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
          ref=""
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
  provide,
  nextTick,
  watch,
  type Ref,
} from 'vue';
import { focusElement } from '../../../utilities/helpers';
import useMenuItems from './useMenuItems';
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
const menuItems = ref<MenuItem[] | []>([]);
provide('menuItems', menuItems);
const mItems = computed(() => (menuItems.value));
const {
  firstMenuItem,
  lastMenuItem,
  nextMenuItem,
  prevMenuItem,
  selectedMenuItem,
  focusedMenuItem,
} = useMenuItems(mItems);
const handleMenuKeydown = async ({ key }: KeyboardEvent) => {
  if (!props.enableKeyboardNavigation) return;
  switch (key) {
    case 'ArrowUp':
      if (prevMenuItem.value && focusedMenuItem.value) {
        focusedMenuItem.value.tabindex = -1;
        prevMenuItem.value.tabindex = 0;
        focusElement(prevMenuItem.value.$el.querySelector('.ui-button'));
      }
      break;
    case 'ArrowDown':
      if (nextMenuItem.value && focusedMenuItem.value) {
        focusedMenuItem.value.tabindex = -1;
        nextMenuItem.value.tabindex = 0;
        focusElement(nextMenuItem.value.$el.querySelector('.ui-button'));
      }
      break;
    case 'Home':
    case 'PageUp':
      if (firstMenuItem.value && focusedMenuItem.value) {
        focusedMenuItem.value.tabindex = -1;
        firstMenuItem.value.tabindex = 0;
        focusElement(firstMenuItem.value.$el.querySelector('.ui-button'));
      }
      break;
    case 'End':
    case 'PageDown':
      if (lastMenuItem.value && focusedMenuItem.value) {
        focusedMenuItem.value.tabindex = -1;
        lastMenuItem.value.tabindex = 0;
        focusElement(lastMenuItem.value.$el.querySelector('.ui-button'));
      }
      break;
    case 'Tab':
      const lastFocusedElement = ref(focusedMenuItem.value);
      setTimeout(() => {
        if(!lastFocusedElement.value) return;
        lastFocusedElement.value.tabindex = -1;
        if (selectedMenuItem.value) {
          selectedMenuItem.value.tabindex = 0;
          return;
        }
        if (firstMenuItem.value) {
          firstMenuItem.value.tabindex = 0;
        }
      }, 0);
      break;
    default: break;
  }
};
defineExpose({
  menuItems,
  firstMenuItem,
  selectedMenuItem,
});
export interface MenuEmits {
  (e: 'itemsLoaded'): void;
}
const emit = defineEmits<MenuEmits>();
const hasMenuItems = computed(() => (
  menuItems.value.length > 0
));
const setItemsNotReachable = () => {
  [ ...menuItems.value ].forEach((item) => {
    item.tabindex = item.$el.querySelector('.ui-button') ? -1 : 0;
  });
  if (selectedMenuItem.value) {
    selectedMenuItem.value.tabindex = 0;
    return
  } else if(firstMenuItem.value) {
    firstMenuItem.value.tabindex = 0;
  }
  emit('itemsLoaded');
};
watch(hasMenuItems, async (hasItems) => {
  if (hasItems) {
    await nextTick();
    setItemsNotReachable();
  }
});
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
