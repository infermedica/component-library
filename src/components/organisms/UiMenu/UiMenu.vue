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
  onMounted,
  provide,
  nextTick,
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
  tabindex: Ref<number>
}

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => ([]),
  enableKeyboardNavigation: true,
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
} = useMenuItems(mItems);
const handleMenuKeydown = ({ key }: KeyboardEvent) => {
  if (!props.enableKeyboardNavigation) return;
  switch (key) {
    case 'ArrowUp':
      if (prevMenuItem.value) {
        focusElement(prevMenuItem.value.$el.querySelector('button'));
      }
      break;
    case 'ArrowDown':
      if (nextMenuItem.value) {
        focusElement(nextMenuItem.value.$el.querySelector('button'));
      }
      break;
    case 'Home':
    case 'PageUp':
      if (firstMenuItem.value) {
        focusElement(firstMenuItem.value.$el.querySelector('button'));
      }
      break;
    case 'End':
    case 'PageDown':
      if (lastMenuItem.value) {
        focusElement(lastMenuItem.value.$el.querySelector('button'));
      }
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
  (e: 'mounted'): void;
}
const emit = defineEmits<MenuEmits>();
onMounted(async () => {
  if (!props.enableKeyboardNavigation) return;
  await nextTick();
  [ ...menuItems.value ].forEach((item) => {
    item.tabindex = -1;
  });
  if (selectedMenuItem.value) {
    selectedMenuItem.value.tabindex = 0;
  } else {
    firstMenuItem.value.tabindex = 0;
  }
  emit('mounted');
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
