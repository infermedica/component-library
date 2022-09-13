import {
  computed,
  ref,
} from 'vue';
import useMutationObserver from '../../../composable/useMutationObserver';
import useActiveElement from '../../../composable/useActiveElement';

export default function useDropdownItems(dropdown) {
  const dropdownItems = ref([]);
  useMutationObserver(dropdown, () => {
    dropdownItems.value = [...dropdown.value.querySelectorAll('.ui-dropdown-item')];
  }, {
    subtree: true,
    childList: true,
  });

  const activeElement = useActiveElement();
  const focusedDropdownItem = computed(
    () => dropdownItems.value.find((item) => activeElement.value === item),
  );
  const activeDropdownItemIndex = computed(() => dropdownItems.value.indexOf(focusedDropdownItem.value));

  const firstDropdownItem = computed(() => dropdownItems.value[0]);
  const lastDropdownItem = computed(() => dropdownItems.value[dropdownItems.value.length - 1]);
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
      (item) => item.classList.contains('ui-dropdown-item--selected'),
    ),
  );

  return {
    dropdownItems,
    focusedDropdownItem,
    activeDropdownItemIndex,
    firstDropdownItem,
    lastDropdownItem,
    nextDropdownItem,
    prevDropdownItem,
    selectedDropdownItem,
  };
}
