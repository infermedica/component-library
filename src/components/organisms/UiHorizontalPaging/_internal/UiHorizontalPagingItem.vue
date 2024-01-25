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
  useAttrs,
} from 'vue';
import type { HorizontalPangingHandleItems } from '../UiHorizontalPaging.vue';

export interface HorizontalPangingItemProps {
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
}

const props = withDefaults(defineProps<HorizontalPangingItemProps>(), {
  label: '',
  title: '',
  name: '',
});
const attrs = useAttrs();
const activeItemName = inject<ComputedRef<string>>('activeItemName', computed(() => ''));
const isActive = computed(() => activeItemName.value === props.name);
const item = computed(() => ({
  ...props,
  ...attrs,
}));
const items = inject<Ref<HorizontalPangingHandleItems>>('items', ref({}));
items.value[props.name] = item.value;
onBeforeUnmount(() => {
  delete items.value[props.name];
});
</script>
