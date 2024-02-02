import {
  computed,
  type ComputedRef,
} from 'vue';
import { useActiveElement } from '../../../composable';

export default function useMenuItems(menuItems: ComputedRef<[] | {$el: HTMLLIElement, tabindex: number | null}[]>) {
  const activeElement = useActiveElement();
  const focusedMenuItem = computed(
    () => ([ ...menuItems.value ].find((item) => item.$el.querySelector('.ui-button') === activeElement.value)),
  );
  const activeMenuItemIndex = computed(() => menuItems.value.findIndex(
    (el) => el === focusedMenuItem.value,
  ));
  const firstMenuItem = computed(() => menuItems.value.at(0));
  const lastMenuItem = computed(() => menuItems.value.at(-1));
  const nextMenuItem = computed(() => (
    (activeMenuItemIndex.value >= menuItems.value.length - 1 || activeMenuItemIndex.value === -1)
      ? firstMenuItem.value
      : menuItems.value[activeMenuItemIndex.value + 1]));
  const prevMenuItem = computed(() => (
    (activeMenuItemIndex.value <= 0 || activeMenuItemIndex.value === -1)
      ? lastMenuItem.value
      : menuItems.value[activeMenuItemIndex.value - 1]));
  const selectedMenuItem = computed(
    () => [ ...menuItems.value ].find(
      (item) => item.$el.querySelector('.ui-button')?.classList.contains('ui-menu-item--is-selected'),
    ),
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
