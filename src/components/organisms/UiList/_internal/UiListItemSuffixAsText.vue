<template>
  <UiText>
    {{ label }}
  </UiText>
</template>

<script setup lang="ts">
import UiText, { type TextAttrsProps } from '../../../atoms/UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface ListItemSuffixAsTextProps {
  /**
   * Use this props to set label.
   */
  label: string;
}
export type ListItemSuffixAsTextAttrsProps = DefineAttrsProps<ListItemSuffixAsTextProps, TextAttrsProps>;

withDefaults(defineProps<ListItemSuffixAsTextProps>(), { label: '' });

// TODO: UiListItemSuffixAsText will be removed in 2.0.0
if (process.env.NODE_ENV !== 'production') {
  console.warn('[@infermedica/component-library]: The `UiListItemSuffixAsButton` component is deprecated and it will be removed in v2.0.0. Please use `UiListItemSuffix` component instead.');
}
</script>
