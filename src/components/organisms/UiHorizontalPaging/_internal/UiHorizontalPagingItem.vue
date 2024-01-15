<template>
  <span
    ref="el"
    class="visual-hidden"
    :tabindex="tabindex"
    @blur="handleA11YHelperBlur"
  />
  <slot v-if="isActive" />
</template>

<script setup lang="ts">
import {
  computed,
  watch,
  ref,
  inject,
  onBeforeUnmount,
  type Ref,
  type ComputedRef,
  nextTick,
} from 'vue';
import type { HorizontalPangingHandleItems } from '../UiHorizontalPaging.vue';
import { focusElement } from '../../../../utilities/helpers';

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
const activeItemName = inject<ComputedRef<string>>('activeItemName', computed(() => ''));
const isActive = computed(() => activeItemName.value === props.name);
const el = ref<HTMLSpanElement | null>(null);
const tabindex = ref(0);
watch(isActive, async (value) => {
  tabindex.value = 0;
  if (!value) return;
  await nextTick();
  focusElement(el.value);
});
const handleA11YHelperBlur = () => {
  tabindex.value = -1;
};
const item = computed(() => ({
  label: props.label,
  title: props.title,
  name: props.name,
}));
const items = inject<Ref<HorizontalPangingHandleItems>>('items', ref({}));
items.value[props.name] = item.value;
onBeforeUnmount(() => {
  delete items.value[props.name];
});
</script>
