import {
  computed,
  type ComputedRef,
} from 'vue';
import { useActiveElement } from '../../../composable';

export default function useMenuItems(menuItems) {
  const activeElement = useActiveElement();
  const focusedMenuItem = computed(
    () => [ ...menuItems.value ].find((menuItem) => menuItem.value.content.$el === activeElement.value).value,
  );
  const activeMenuItemIndex = computed(() => menuItems.value.findIndex(
    (menuItem) => menuItem.value.content.$el === focusedMenuItem.value.content.$el,
  ));
  const firstMenuItem = computed(() => menuItems.value.at(0).value);
  const lastMenuItem = computed(() => menuItems.value.at(-1).value);
  const nextMenuItem = computed(() => (
    (activeMenuItemIndex.value >= menuItems.value.length - 1 || activeMenuItemIndex.value === -1)
      ? firstMenuItem.value
      : menuItems.value[activeMenuItemIndex.value + 1].value));
  const prevMenuItem = computed(() => (
    (activeMenuItemIndex.value <= 0 || activeMenuItemIndex.value === -1)
      ? lastMenuItem.value
      : menuItems.value[activeMenuItemIndex.value - 1].value));
  const selectedMenuItem = computed(
    () => [ ...menuItems.value ]
      .find((menuItem) => menuItem.value.isSelected.value)
      .value,
  );

  return {
    activeElement,
    focusedMenuItem,
    activeMenuItemIndex,
    firstMenuItem,
    lastMenuItem,
    nextMenuItem,
    prevMenuItem,
    selectedMenuItem,
  };
}
