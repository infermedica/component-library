<template>
  <UiMenu v-bind="args" :items-template-refs="menuItemsTemplateRefs">
    <template v-for="item in args.items">
      <UiMenuItem v-bind="item" ref="menuItemsTemplateRefs">
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

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const menuItemsTemplateRefs = ref([]);
</script>
