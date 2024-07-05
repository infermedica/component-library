<template>
  <slot v-if="isActive" />
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  inject,
  onBeforeUnmount,
  type Ref,
  type ComputedRef,
} from 'vue';
import type { HorizontalPagingHandleItems } from '../UiHorizontalPaging.vue';
import type { MenuItemProps } from '../../UiMenu/_internal/MenuItemProps';
import type { MenuItemAttrsProps } from '../../UiMenu/_internal/UiMenuItem.vue';

export interface HorizontalPagingItemProps extends MenuItemProps {
  /**
   * Use this props to set inside pages item label.
   */
  label?: string;
  /**
   * Use this props to set inside pages item title.
   */
  title?: string;
  /**
   * Use this props to set inside pages item name.
   */
  name?: string;
  /**
   * Use this props to set UiMenuItemAttrs.
   */
  menuItemAttrs?: MenuItemAttrsProps;
}
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<HorizontalPagingItemProps>(), {
  label: '',
  title: '',
  name: '',
  menuItemAttrs: () => ({}),
});
const activeItemName = inject<ComputedRef<string>>('activeItemName', computed(() => ''));
const isActive = computed(() => activeItemName.value === props.name);
const items = inject<Ref<HorizontalPagingHandleItems>>('items', ref({}));
items.value[props.name] = props;
onBeforeUnmount(() => {
  delete items.value[props.name];
});
</script>
