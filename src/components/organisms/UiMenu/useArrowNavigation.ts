import { computed } from 'vue';

export interface ElementRef {
  itemTemplateRefs?: any;
  isSelected: boolean;
  isFocused: boolean;
  tabindex: number;
}

export default function useArrowNavigation(elementsRefs) {
  const focusedElement = computed(() => elementsRefs.value.find((elementRef) => elementRef.isFocused));
  const focusedElementIndex = computed(() => elementsRefs.value.findIndex((elementRef) => elementRef.isFocused));
  const selectedElement = computed(() => (elementsRefs.value.find((elementRef) => elementRef.isSelected)));
  const firstElement = computed(() => (elementsRefs.value.at(0)));
  const initialElement = computed(() => (selectedElement.value || firstElement.value));
  const lastElement = computed(() => (elementsRefs.value.at(-1)));
  const elements = computed(() => (elementsRefs.value.length));
  const nextElement = computed(() => {
    if (focusedElementIndex.value >= elements.value - 1) {
      return firstElement.value;
    }
    return elementsRefs.value.at(focusedElementIndex.value + 1);
  });
  const prevElement = computed(() => {
    if (focusedElementIndex.value <= 0 || focusedElementIndex.value === -1) {
      return lastElement.value;
    }
    return elementsRefs.value.at(focusedElementIndex.value - 1);
  });
  return {
    focusedElement,
    focusedElementIndex,
    firstElement,
    initialElement,
    lastElement,
    selectedElement,
    nextElement,
    prevElement,
  };
}
