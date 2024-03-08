<template>
  <UiMenu v-bind="args">
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiMenuItem v-bind="item">
        {{ item.label }}
      </UiMenuItem>
    </template>
  </UiMenu>
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import { UiMenu } from '@infermedica/component-library';
import UiMenuItem from '../_internal/UiMenuItem.vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (Object.keys(attrs).reduce((object, key) => {
  if (key === 'items') {
    return object;
  }
  object[key] = attrs[key];
  return object;
}, {})));
const { items } = toRefs(attrs);
</script>
