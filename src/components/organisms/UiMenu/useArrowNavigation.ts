import {
  computed,
  type ComponentInstance,
  type Ref,
} from 'vue';

export interface ElementRef {
  itemTemplateRefs?: ComponentInstance<any>;
  isSelected: boolean;
  isFocused: boolean;
  tabindex: number;
}

export default function useArrowNavigation(elementsRefs: Ref<ElementRef[]>) {
  const focusedElement = computed(() => elementsRefs.value.find((elementRef) => elementRef.isFocused));
  const focusedElementIndex = computed(() => elementsRefs.value.findIndex((elementRef) => elementRef.isFocused));
  const selectedElement = computed(() => (elementsRefs.value.find((elementRef) => elementRef.isSelected)));
  const initialElement = computed(() => (selectedElement.value || elementsRefs.value.at(0)));
  const elementsLength = computed(() => (elementsRefs.value.length));
  const nextElement = computed(() => {
    if (focusedElementIndex.value >= elementsLength.value - 1) {
      return elementsRefs.value.at(0);
    }
    return elementsRefs.value.at(focusedElementIndex.value + 1);
  });
  const prevElement = computed(() => {
    if (focusedElementIndex.value <= 0 || focusedElementIndex.value === -1) {
      return elementsRefs.value.at(-1);
    }
    return elementsRefs.value.at(focusedElementIndex.value - 1);
  });
  return {
    focusedElement,
    focusedElementIndex,
    initialElement,
    selectedElement,
    nextElement,
    prevElement,
  };
}
