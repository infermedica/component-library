<template>
  <div
    ref="el"
    className="ComponentNameKebabCase"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
} from 'vue';
import type { HTMLAttributes } from 'vue';
import type { DefineAttrsProps } from '../../../types';

export interface ComponentNameProps {
  content?: string;
}
export type ComponentNameAttrsProps = DefineAttrsProps<ComponentNameProps, HTMLAttributes>;
export interface ComponentNameEmits {
  (e:'update:content', value: ComponentNameProps['content']): void;
}

const props = withDefaults(defineProps<ComponentNameProps>(), { content: '' });
const emit = defineEmits<ComponentNameEmits>();
const el = ref<HTMLElement | null>(null);
const hasContent = computed(() => (!!props.content));
function updateHandler(value: ComponentNameProps['content']) {
  emit('update:content', value);
}
// or use Computed Setter
// const hasContent = computed({
//   get() {
//     return !!props.content;
//   },
//   set(value) {
//     emit('update:content', value);
//   },
// });
</script>

<style lang="scss">
.ComponentNameKebabCase {
  // cursor: inherit;
}
</style>
