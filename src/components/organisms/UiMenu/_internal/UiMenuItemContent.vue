<template>
  <slot>
    <UiText>{{ label }}</UiText>
  </slot>
</template>

<script setup lang="ts">
import UiText from '../../../atoms/UiText/UiText.vue';

export interface ListItemContentProps {
  item?: any
}

const props = withDefaults(defineProps<ListItemContentProps>(), { item: () => ({ name: '' }) });

const { label } = props.item;
</script>
