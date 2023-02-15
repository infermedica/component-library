<template>
  <UiText>
    {{ label }}
  </UiText>
</template>

<script setup lang="ts">
import UiText from '../../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../../atoms/UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface ListItemSuffixAsTextProps {
  /**
   * Use this props to set label.
   */
  label: string;
}
export type ListItemSuffixAsTextAttrsProps = DefineAttrsProps<ListItemSuffixAsTextProps, TextAttrsProps>;

withDefaults(defineProps<ListItemSuffixAsTextProps>(), { label: '' });
</script>
