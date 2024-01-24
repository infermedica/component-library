<template>
  <UiMenuItem
    v-bind="buttonItemAttrs"
    :class="[
      'ui-dropdown-item',
      { 'ui-menu-item--is-selected': isSelected },
    ]"
  >
    <slot />
  </UiMenuItem>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import equal from 'fast-deep-equal';
import type { MenuItemProps } from '@/components/organisms/UiMenu/_internal/MenuItemProps';
import type { DefineAttrsProps } from '../../../../types';
import UiMenuItem from '../../../organisms/UiMenu/_internal/UiMenuItem.vue';
import type MenuItemAttrsProps from '../../../organisms/UiMenu/_internal/UiMenuItem.vue';
import type { DropdownModelValue } from '../UiDropdown.vue';

export interface DropdownItemProps extends MenuItemProps{
  /**
   * Use this props to set the value of the dropdown item.
   */
  value?: DropdownModelValue;
}
export type DropdownItemAttrsProps = DefineAttrsProps<DropdownItemProps, MenuItemAttrsProps>;

const props = withDefaults(defineProps<DropdownItemProps>(), {
  value: '',
  icon: 'present',
  suffixVisible: 'default',
  suffixAttrs: () => ({ class: 'ui-button--text ui-menu-item__suffix' }),
  listItemAttrs: () => ({ class: 'ui-menu-item' }),
});
const modelValue = inject<DropdownModelValue>('modelValue');
const handleUpdateModelValue = () => {
  modelValue.value = props.value;
};
const isSelected = computed<boolean>(() => {
  if (!modelValue.value) {
    return false;
  }
  if (typeof modelValue.value === 'string') {
    return props.value === modelValue.value;
  }
  return equal(
    JSON.parse(JSON.stringify(modelValue.value)),
    JSON.parse(JSON.stringify(props.value)),
  ) as boolean;
});
const buttonItemAttrs = computed(() => {
  const obj = { 'aria-checked': isSelected.value };
  return {
    onClick: handleUpdateModelValue,
    ...obj,
  };
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-dropdown-item {
}
</style>
