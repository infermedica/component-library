<template>
  <slot>
    <UiText>{{ label }}</UiText>
  </slot>
  <component
    :is="childrenListComponent"
    v-if="hasChildren"
    v-bind="children"
  />
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
} from 'vue';
import type { ListRenderItem } from '../UiList.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

export interface ListItemContentProps {
  item?: ListRenderItem
}

const props = withDefaults(defineProps<ListItemContentProps>(), { item: () => ([]) });
const {
  label,
  children,
} = props.item;
const hasChildren = computed(() => ('children' in props.item));
const childrenListComponent = computed(() => (hasChildren.value ? defineAsyncComponent(() => import('../UiList.vue')) : null));
</script>
