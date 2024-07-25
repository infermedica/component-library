<template>
  <UiList
    class="ui-menu"
    @keydown="handleMenuKeyDown"
  >
    <!-- @slot Use this slot to place menu items. -->
    <slot>
      <template
        v-for="item in itemsToRender"
        :key="item.name"
      >
        <UiMenuItem
          ref="internalMenuItemsTemplateRefs"
          v-bind="item"
        >
          <slot
            v-bind="item"
            :name="item.name"
          >
            <UiText tag="span">{{ item.label }}</UiText>
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
  type ComponentInstance,
  onBeforeUnmount,
} from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import useArrowNavigation, { type ElementRef } from './useArrowNavigation';
import { focusElement } from '../../../utilities/helpers';
import UiList, { type ListAttrsProps } from '../UiList/UiList.vue';
import UiMenuItem, { type MenuItemAttrsProps } from './_internal/UiMenuItem.vue';
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
  menuItemsTemplateRefs?: ComponentInstance<typeof UiMenuItem>[] | null;
  /**
   * Use this props to show button.
   */
  isButton?: boolean;
}
export type MenuAttrsProps = DefineAttrsProps<MenuProps, ListAttrsProps>;

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => ([]),
  enableKeyboardNavigation: true,
  menuItemsTemplateRefs: null,
  isButton: false,
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
const internalMenuItemsTemplateRefs = ref<InstanceType<typeof UiMenuItem>[]>([]);
const usedmenuTemplateRef = computed(() => (props.menuItemsTemplateRefs || internalMenuItemsTemplateRefs.value));
const {
  focusedElement,
  initialElement,
  selectedElement,
  nextElement,
  prevElement,
} = useArrowNavigation(usedmenuTemplateRef);
const setNegativeTabindexForNonInitialMenuItems = async () => {
  usedmenuTemplateRef.value.forEach((item) => {
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
      && usedmenuTemplateRef.value.length > 0) {
    setNegativeTabindexForNonInitialMenuItems();
  } else {
    usedmenuTemplateRef.value.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.tabindex = 0;
    });
  }
});
onMounted(async () => {
  await nextTick();
  if (props.enableKeyboardNavigation
      && usedmenuTemplateRef.value.length > 0) {
    setNegativeTabindexForNonInitialMenuItems();
  }
  if (process.env.NODE_ENV !== 'production') {
    if (props.enableKeyboardNavigation
        && usedmenuTemplateRef.value.length < 1
    ) {
      console.warn('@infermedica/component-library: use itemsTemplateRefs to pass UiMenuItems template refs.');
    }
  }
});
const lastFocusedmenuItemTemplateRef = ref<ElementRef | null>(null);
const handleMenuItemFocus = async (element: ElementRef | InstanceType<typeof UiMenuItem> | undefined) => {
  if (element && initialElement.value) {
    await focusElement(element?.itemTemplateRefs?.content?.$el, true);
    initialElement.value.tabindex = -1;
  }
};
const handleMenuKeyDown = async ({ key }: KeyboardEvent) => {
  if (!props.enableKeyboardNavigation) return;
  const activeElement = focusedElement.value;
  switch (key) {
    case 'ArrowUp':
      handleMenuItemFocus(prevElement.value);
      break;
    case 'ArrowDown':
      handleMenuItemFocus(nextElement.value);
      break;
    case 'Home':
    case 'PageUp':
      handleMenuItemFocus(usedmenuTemplateRef.value.at(0));
      break;
    case 'End':
    case 'PageDown':
      handleMenuItemFocus(usedmenuTemplateRef.value.at(-1));
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
    lastFocusedmenuItemTemplateRef.value = prevEl;
    if (initialElement.value) {
      initialElement.value.tabindex = 0;
    }
  }
});
defineExpose({
  menuItemsTemplateRefs: usedmenuTemplateRef,
  initialmenuItemTemplateRef: initialElement,
  firstmenuItemTemplateRef: usedmenuTemplateRef.value.at(0),
  lastmenuItemTemplateRef: usedmenuTemplateRef.value.at(-1),
  selectedmenuItemTemplateRef: selectedElement,
  lastFocusedmenuItemTemplateRef,
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

$element: list;

#storybook-root:has(.has-button) {
  @include mixins.inner-border($element, $color: var(--color-border-subtle), $radius: var(--border-radius-form));
}

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

.ui-menu-item-button {
  margin: 0 0 var(--space-4);
  padding: var(--space-4) var(--space-8);
  border-top: 1px solid var(--color-gray-100);

  .ui-button {
    &__icon {
      margin-block: var(--space-4);
    }
  }

  &__title {
    display: flex;
  }

  &__button {
    display: initial;
    width: 100%;
    padding: var(--space-8) var(--space-12);
    padding-inline: var(--space-8);
    text-align: left;

    @include mixins.from-tablet {
      padding: var(--space-4) var(--space-8);
    }

    @include mixins.with-hover {
      &:hover {
        background-color: var(--color-background-white-hover);
      }
    }

    &:active {
      background-color: var(--color-background-white-active);
    }

    &:not([aria-disabled]):hover  {
      background: var(--color-background-white-hover);
    }
  }

  &__label {
    align-content: center;
    padding: 0 var(--space-12);
    font: var(--font-body-1-thick);
    letter-spacing: var(--letter-spacing-small);
  }

  &__hint {
    overflow: hidden;
    padding: var(--space-4);
    margin-inline: var(--space-32);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
