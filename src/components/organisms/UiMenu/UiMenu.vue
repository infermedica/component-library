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
  watch,
  nextTick,
  onMounted,
  type ComputedRef,
  type ComponentInstance,
  onBeforeUnmount,
} from 'vue';
import useArrowNavigation, { type ElementRef } from './useArrowNavigation';
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
  itemsTemplateRefs?: ComponentInstance<typeof UiMenuItem>[] | [];
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
const menuItemsTemplateRefs = ref<InstanceType<typeof UiMenuItem>[]>([]);
watch(props.itemsTemplateRefs, () => {
  menuItemsTemplateRefs.value = props.itemsTemplateRefs;
});
const {
  focusedElement,
  firstElement,
  initialElement,
  lastElement,
  selectedElement,
  nextElement,
  prevElement,
} = useArrowNavigation(menuItemsTemplateRefs);
const setNegativeTabindexForNonInitialMenuItems = async () => {
  menuItemsTemplateRefs.value.forEach((item) => {
    if (item === initialElement.value) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    item.tabindex = -1;
  });
};
watch(() => (props.enableKeyboardNavigation), async () => {
  await nextTick();
  if (props.enableKeyboardNavigation
      && menuItemsTemplateRefs.value.length > 0) {
    setNegativeTabindexForNonInitialMenuItems();
  } else {
    menuItemsTemplateRefs.value.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.tabindex = 0;
    });
  }
});
onMounted(async () => {
  await nextTick();
  if (props.enableKeyboardNavigation
      && menuItemsTemplateRefs.value.length > 0) {
    setNegativeTabindexForNonInitialMenuItems();
  }
  if (process.env.NODE_ENV !== 'production') {
    if (props.enableKeyboardNavigation
        && menuItemsTemplateRefs.value.length < 1
    ) {
      console.warn('@infermedica/component-library: use itemsTemplateRefs to pass UiMenuItems template refs.');
    }
  }
});
const lastFocusedMenuItemTemplateRefs = ref<ElementRef | null>(null);
const handleMenuItemFocus = async (element: ComputedRef<ElementRef | undefined>) => {
  if (element.value && initialElement.value) {
    await focusElement(element.value.itemTemplateRefs.content.$el, true);
    initialElement.value.tabindex = -1;
  }
};
const handleMenuKeyDown = async ({ key }: KeyboardEvent) => {
  if (!props.enableKeyboardNavigation) {
    return;
  }
  const activeElement = focusedElement.value;
  switch (key) {
    case 'ArrowUp':
      handleMenuItemFocus(prevElement);
      break;
    case 'ArrowDown':
      handleMenuItemFocus(nextElement);
      break;
    case 'Home':
    case 'PageUp':
      handleMenuItemFocus(firstElement);
      break;
    case 'End':
    case 'PageDown':
      handleMenuItemFocus(lastElement);
      break;
    case 'Tab':
      if (initialElement.value === activeElement) {
        return;
      }
      if (activeElement) {
        activeElement.tabindex = 0;
        // We need to use setTimeout() because nextTick() does not bring the desired effect.
        window.setTimeout(() => {
          activeElement.tabindex = -1;
        }, 0);
      }
      break;
    default:
      break;
  }
};
const isFocused = ref(false);
const scrollLock = (event: KeyboardEvent) => {
  if ((!props.enableKeyboardNavigation && !isFocused.value)
      || !isFocused.value) {
    return;
  }
  const { key } = event;
  if ([
    'ArrowUp',
    'ArrowDown',
    'Home',
    'PageUp',
    'End',
    'PageDown',
  ].includes(key)) {
    event.preventDefault();
  }
};
onMounted(() => {
  window.addEventListener('keydown', scrollLock);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', scrollLock);
});
watch(focusedElement, (el, prevEl) => {
  isFocused.value = !!(el && Object.keys(el).length > 0);
  if (!el && prevEl) {
    lastFocusedMenuItemTemplateRefs.value = prevEl;
    if (initialElement.value) {
      initialElement.value.tabindex = 0;
    }
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
