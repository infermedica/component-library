<template>
  <slot>
    <UiText>{{ label }}</UiText>
  </slot>
</template>

<script setup lang="ts">
import UiText from '../../../atoms/UiText/UiText.vue';
import type { MenuRenderItem } from '../UiMenu.vue';

export interface ListItemContentProps {
  item?: MenuRenderItem
}

const props = withDefaults(defineProps<ListItemContentProps>(), { item: () => ({ name: '' }) });

const { label } = props.item;
</script>
