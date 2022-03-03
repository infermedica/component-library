<template>
 <div
   ref="el"
   className="ComponentNameKebabCase"
 >
   <!-- @slot Use this slot to place content inside component.-->
   <slot/>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  /**
   * Use this props to set content,
   */
  content: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:content']);
const el = ref(null);
const hasContent = computed(() => (!!props.content));
function updateHandler(value) {
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
