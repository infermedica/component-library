<template>
  <UiMenu v-bind="args" :menu-items-template-refs="menuItemsTemplateRefs">
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <UiMenuItem
        ref="menuItemsTemplateRefs"
        v-bind="item"
      >
        <UiText>{{ item.label }}</UiText>
      </UiMenuItem>
    </template>
  </UiMenu>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiMenu,
  UiText,
} from '@infermedica/component-library';
import UiMenuItem from '../_internal/UiMenuItem.vue';
import type { MenuItemProps } from '../_internal/MenuItemProps';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const items = computed<MenuItemProps>(() => (args.value.items));
const menuItemsTemplateRefs = ref([]);
</script>
