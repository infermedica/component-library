<template>
  <slot v-if="isActive" />
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
} from 'vue';
import type { Ref } from 'vue';
import type { HorizontalPagingItem } from '../UiHorizontalPaging.vue';

const props = defineProps({
  /**
   * Use this props to set inside pages item label.
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set inside pages item title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set inside pages item name.
   */
  name: {
    type: String,
    default: '',
  },
});

const activeItemName = inject('activeItemName') as Ref<string>;
const isActive = computed(() => activeItemName.value === props.name);

const item = computed(() => ({
  label: props.label,
  title: props.title,
  name: props.name,
}));
const items = inject('items') as Ref<Record<string, HorizontalPagingItem>>;
items.value[props.name] = item.value;
onBeforeUnmount(() => {
  delete items.value[props.name];
});
</script>
