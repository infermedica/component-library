<template>
  <!-- :has-suffix, :icon  -->
  <UiListItem
    ref="menuItemTemplateRefs"
    v-bind="attrsForListItem"
    :tag="UiButton"
    :has-suffix="hasSuffix"
    :class="menuItemClass"
    :tabindex="tabindex"
    :list-item-attrs="defaultProps.listItemAttrs"
    :suffix-attrs="defaultProps.suffixAttrs"
    @blur="handleMenuItemBlur"
    @focus="handleMenuItemFocus"
  >
    <!-- Allow to use UiListItemSlots / BEGIN -->
    <template
      v-for="(_, name) in $slots"
      #[name]="data"
    >
      <slot
        v-bind="data"
        :name="name"
      />
    </template>
    <!-- END -->
    <slot />
  </UiListItem>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useAttrs,
} from 'vue';
import UiListItem, { type ListItemAttrsProps } from '../../UiList/_internal/UiListItem.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { DefineAttrsProps } from '../../../../types';
import type { MenuItemProps } from './MenuItemProps';

export type MenuItemAttrsProps = DefineAttrsProps<MenuItemProps>;

defineOptions({ inheritAttrs: false });

const attrs:ListItemAttrsProps = useAttrs();
const attrsForListItem = computed(() => {
  const {
    name, label, ...rest
  } = attrs;
  return rest;
});

const isSelected = computed(() => (('class' in attrsForListItem.value)
  ? attrs.class.includes('ui-menu-item--is-selected')
  : false));
const hasSuffix = computed(() => (isSelected.value
    || attrsForListItem.value.hasSuffix));
const isFocused = ref(false);
const tabindex = ref(0);
const handleMenuItemFocus = () => { isFocused.value = true; };
const handleMenuItemBlur = () => { isFocused.value = false; };
const defaultProps = computed(() => ({
  listItemAttrs: {
    class: [
      'ui-menu-item',
      { 'ui-menu-item--is-selected': isSelected.value },
    ],
    ...{ ...(attrs.listItemAttrs || {}) },
  },
  suffixAttrs: {
    icon: attrsForListItem.value.icon || 'present',
    ...attrsForListItem.value.suffixAttrs,
  },
}));
const menuItemClass = computed(() => ([
  'ui-menu-item__content',
  'ui-button--outlined',
  { 'ui-button--is-selected': isSelected.value },
]));

const menuItemTemplateRefs = ref(null);
defineExpose({
  itemTemplateRefs: menuItemTemplateRefs,
  isSelected,
  isFocused,
  tabindex,
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-menu-item {
  $this: &;
  $element: menu-item;

  @include mixins.override-logical(list-item, null, border-width, 0);
  @include mixins.use-logical($element, padding, var(--space-4) var(--space-8));

  justify-content: flex-start;

  &__content {
    @include mixins.override-logical(button, $element + "-content", border-radius, var(--border-radius-form));
    @include mixins.override-logical(button, $element + "-content", padding, var(--space-8));
    @include mixins.override-logical(button, null, border-width, 0);

    justify-content: flex-start;
  }

  &--is-selected {
    --text-color: var(--color-text-on-selection);
    --list-item-suffix-icon-color: var(--color-icon-on-selection);
    --list-item-suffix-hover-icon-color: var(--color-icon-on-selection);
    --list-item-suffix-active-icon-color: var(--color-icon-on-selection);
  }
}
</style>
