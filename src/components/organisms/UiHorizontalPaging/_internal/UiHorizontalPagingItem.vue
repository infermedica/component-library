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
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { HorizontalPangingHandleItems } from '../_.vue';
import type { HTMLTag } from '../../../../types';

export interface HorizontalPagingItemProps {
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
   * Use this props to set list item content tag.
   */
  tag?: HTMLTag;
}
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<HorizontalPagingItemProps>(), {
  label: '',
  title: '',
  name: '',
  tag: UiButton,
});
const attrs = useAttrs();
const activeItemName = inject<ComputedRef<string>>('activeItemName', computed(() => ''));
const isActive = computed(() => activeItemName.value === props.name);
const item = computed(() => ({
  label: props.label,
  title: props.title,
  name: props.name,
  ...(props.tag === UiButton ? {} : { tag: props.tag }),
  ...attrs,
}));
const items = inject<Ref<HorizontalPangingHandleItems>>('items', ref({}));
items.value[props.name] = item.value;
onBeforeUnmount(() => {
  delete items.value[props.name];
});
</script>
