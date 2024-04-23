<template>
  <UiList
    class="ui-menu"
    @keydown="handleMenuKeyDown"
  >
    <!-- @slot Use this slot to place menu items. -->
    <slot>
      <template
        v-for="(item, index) in itemsToRender"
        :key="index"
      >
        <UiMenuItem
          ref="menuItemsTemplateRefs"
          v-bind="item"
        >
          <slot
            v-bind="item"
            :name="item.name"
          >
            <UiMenuItemContent :item="item" />
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
  reactive,
  watch,
  nextTick,
} from 'vue';
import { disabled } from '@sb/helpers/argTypes';
import useArrowNavigation from './useArrowNavigation';
import { focusElement } from '../../../utilities/helpers';
import UiList, { type ListAttrsProps } from '../UiList/UiList.vue';
import UiMenuItem, { type MenuItemAttrsProps } from './_internal/UiMenuItem.vue';
import UiMenuItemContent from './_internal/UiMenuItemContent.vue';
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
   * Use this props to allow using arrows instead tabs for navigation UiMenuItems.
   */
  enableKeyboardNavigation?: boolean;
  /**
   * Use this props to pass refs to UiMenuItems.
   */
  itemsTemplateRefs?: any;
}
export type MenuAttrsProps = DefineAttrsProps<MenuProps, ListAttrsProps>;

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => ([]),
  enableKeyboardNavigation: true,
  itemsTemplateRefs: () => ([]),
});
provide('enableKeyboardNavigation', props.enableKeyboardNavigation);
const itemsToRender = computed<MenuRenderItem[]>(() => (props.items.map((item, index) => {
  if (typeof item === 'string') {
    return {
      name: `menu-item-${index}`,
      label: item,
    };
  }
  return {
    name: `menu-item-${index}`,
    ...item,
  };
})));
const disabledKeyboardNavigation = computed(() => (!props.enableKeyboardNavigation));
const menuItemsTemplateRefs = ref([]);
watch(props.itemsTemplateRefs, () => {
  menuItemsTemplateRefs.value = props.itemsTemplateRefs;
});
if (props.enableKeyboardNavigation
    && props.itemsTemplateRefs.value
    && props.itemsTemplateRefs.value.length < 1) {
  console.warn('@infermedica/component-library: use itemsTemplateRefs to pass UiMenuItems template refs.');
}
const {
  focusedElement,
  firstElement,
  initialElement,
  lastElement,
  selectedElement,
  nextElement,
  prevElement,
} = useArrowNavigation(menuItemsTemplateRefs);
watch([
  menuItemsTemplateRefs,
  () => (props.enableKeyboardNavigation),
], async () => {
  await nextTick();
  if (disabledKeyboardNavigation.value) {
    menuItemsTemplateRefs.value.forEach((item) => {
      item.tabindex = 0;
    });
  }
  if (props.enableKeyboardNavigation
      && menuItemsTemplateRefs.value.length > 0) {
    menuItemsTemplateRefs.value.forEach((item) => {
      if (item === initialElement.value) {
        return;
      }
      item.tabindex = -1;
    });
  }
}, { immediate: true });
const lastFocusedMenuItemTemplateRefs = ref(null);
const handleMenuKeyDown = async ({ key }: KeyboardEvent) => {
  if (disabledKeyboardNavigation.value) {
    return;
  }
  const activeElement = focusedElement.value;
  switch (key) {
    case 'ArrowUp':
      if (prevElement.value) {
        await focusElement(prevElement.value.menuItemTemplateRefs.content.$el, true);
        initialElement.value.tabindex = -1;
      }
      break;
    case 'ArrowDown':
      if (nextElement.value) {
        await focusElement(nextElement.value.menuItemTemplateRefs.content.$el, true);
        initialElement.value.tabindex = -1;
      }
      break;
    case 'Home':
    case 'PageUp':
      if (firstElement.value) {
        await focusElement(firstElement.value.menuItemTemplateRefs.content.$el, true);
        initialElement.value.tabindex = -1;
      }
      break;
    case 'End':
    case 'PageDown':
      if (lastElement.value) {
        await focusElement(lastElement.value.menuItemTemplateRefs.content.$el, true);
        initialElement.value.tabindex = -1;
      }
      break;
    case 'Tab':
      if (initialElement.value === activeElement) {
        return;
      }
      activeElement.tabindex = 0;
      // We need to use setTimeout() because nextTick() does not bring the desired effect.
      window.setTimeout(() => {
        activeElement.tabindex = -1;
      }, 0);
      break;
    default:
      break;
  }
};
const isFocused = ref(false);
const scrollLock = (event) => {
  const { key } = event;
  switch (key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Home':
    case 'PageUp':
    case 'End':
    case 'PageDown':
      event.preventDefault();
      break;
    default:
      break;
  }
};
watch(isFocused, (value) => {
  if (disabledKeyboardNavigation.value) {
    return;
  }
  if (value) {
    window.addEventListener('keydown', scrollLock);
  } else {
    window.removeEventListener('keydown', scrollLock);
  }
});
watch(focusedElement, (el, prevEl) => {
  isFocused.value = el && Object.keys(el).length > 0;
  if (!el && prevEl) {
    lastFocusedMenuItemTemplateRefs.value = prevEl;
    initialElement.value.tabindex = 0;
  }
});
defineExpose({
  menuItemsTemplateRefs,
  initialMenuItemTemplateRefs: initialElement,
  firstMenuItemTemplateRefs: firstElement,
  lastMenuItemTemplateRefs: lastElement,
  selectedMenuItemTemplateRefs: selectedElement,
  lastFocusedMenuItemTemplateRefs,
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-menu {
  $this: &;

  &--compact {
    #{$this}-item {
      &__content {
        @include mixins.override-logical(button, "menu-item-content", padding, var(--space-4) var(--space-8));
      }
    }
  }
}
</style>
