<template>
  <div class="ui-mega-menu">
    <!-- @slot Use this slot to place content inside MegaMenu. -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';

const props = defineProps({
  /**
   * Use this props or v-model to set value.
   */
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();
const open = computed(() => (props.modelValue));
const hasOpen = computed(() => (!!props.modelValue));
function openHandler(name: string): void {
  emit('update:modelValue', name);
}
provide('open', open);
provide('hasOpen', hasOpen);
provide('openHandler', openHandler);
</script>

<style lang="scss">
.ui-mega-menu {
  cursor: inherit;
}
</style>
