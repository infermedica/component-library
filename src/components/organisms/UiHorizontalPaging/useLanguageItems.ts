import { computed } from 'vue';
import type { Ref } from 'vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import { useActiveElement } from '../../../composable';

export default function useLanguageItems(dropdown: Ref<InstanceType<typeof UiMenuItem>[] | null>) {
  const dropdownItems = computed(() => {
    if (!dropdown.value) return [];
    return [ ...dropdown.value.menuItems ].map((item) => (item.$el.querySelector('button')));
  });

  const activeElement = useActiveElement();
  const focusedDropdownItem = computed(
    () => dropdownItems.value.find((item) => activeElement.value === item),
  );
  const activeDropdownItemIndex = computed(() => dropdownItems.value.findIndex(
    (el) => el === focusedDropdownItem.value,
  ));

  const firstDropdownItem = computed(() => dropdownItems.value.at(0));
  const lastDropdownItem = computed(() => dropdownItems.value.at(-1));
  const nextDropdownItem = computed(() => (
    (activeDropdownItemIndex.value >= dropdownItems.value.length - 1 || activeDropdownItemIndex.value === -1)
      ? firstDropdownItem.value
      : dropdownItems.value[activeDropdownItemIndex.value + 1]));

  const prevDropdownItem = computed(() => (
    (activeDropdownItemIndex.value <= 0 || activeDropdownItemIndex.value === -1)
      ? lastDropdownItem.value
      : dropdownItems.value[activeDropdownItemIndex.value - 1]));

  const selectedDropdownItem = computed(
    () => dropdownItems.value.find(
      (item) => item.classList.contains('ui-menu-item--is-selected'),
    ),
  );

  return {
    firstDropdownItem,
    lastDropdownItem,
    nextDropdownItem,
    prevDropdownItem,
    selectedDropdownItem,
  };
}
